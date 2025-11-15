import React, { useState, useEffect } from 'react';
import Card from './Card';
import { Doubt, Answer } from '../types';
import { askAITutor } from '../services/geminiService';
import { CURRENT_USER } from '../constants';

const DoubtDetailModal: React.FC<{
    doubt: Doubt;
    onClose: () => void;
    onAddAnswer: (doubtId: string, content: string) => void;
    onToggleResolve: (doubtId: string) => void;
}> = ({ doubt, onClose, onAddAnswer, onToggleResolve }) => {
    const [answerContent, setAnswerContent] = useState('');

    const handleAddAnswer = () => {
        if(answerContent.trim()) {
            onAddAnswer(doubt.id, answerContent);
            setAnswerContent('');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="p-0 w-full max-w-2xl max-h-[90vh] flex flex-col">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-xl font-bold">{doubt.subject}</h2>
                            <p className="text-[var(--text-primary)] mt-1">{doubt.question}</p>
                            <div className="flex items-center text-sm text-[var(--text-secondary)] mt-2">
                                <img src={doubt.asker.avatarUrl} className="w-6 h-6 rounded-full mr-2" alt={doubt.asker.name}/>
                                <span>{doubt.asker.name} &bull; {doubt.timestamp}</span>
                            </div>
                        </div>
                        <button onClick={onClose} className="text-[var(--text-secondary)] text-3xl hover:text-white">&times;</button>
                    </div>
                </div>

                <div className="flex-grow overflow-y-auto px-6 space-y-4">
                    {doubt.answers.map(answer => (
                        <div key={answer.id} className="flex items-start bg-black/20 p-3 rounded-lg">
                            <img src={answer.author.avatarUrl} className="w-8 h-8 rounded-full mr-3 mt-1" alt={answer.author.name} />
                            <div>
                                <p className="font-semibold text-sm text-white">{answer.author.name} <span className="text-[var(--text-secondary)] text-xs font-normal ml-2">{answer.timestamp}</span></p>
                                <p className="text-[var(--text-primary)]">{answer.content}</p>
                            </div>
                        </div>
                    ))}
                    {doubt.answers.length === 0 && <p className="text-[var(--text-secondary)] text-center py-4">No answers yet. Be the first to help!</p>}
                </div>
                
                <div className="mt-4 p-6 border-t border-[var(--border-color)] bg-black/20">
                     <textarea
                        value={answerContent}
                        onChange={(e) => setAnswerContent(e.target.value)}
                        className="w-full p-2 rounded-lg input-high-tech"
                        rows={3}
                        placeholder="Provide your solution..."
                    />
                    <div className="flex justify-between items-center mt-3">
                        {doubt.asker.id === CURRENT_USER.id && (
                             <button onClick={() => onToggleResolve(doubt.id)} className={`btn-base text-sm !py-1.5 !px-4 ${doubt.isResolved ? 'btn-green' : 'btn-red !bg-yellow-500/10 !border-yellow-500/30 !text-yellow-400 hover:!border-yellow-400'}`}>
                                {doubt.isResolved ? 'Mark as Unresolved' : 'Mark as Resolved'}
                            </button>
                        )}
                        <div className="flex-grow"></div>
                        <button onClick={handleAddAnswer} className="btn-base btn-primary">Add Answer</button>
                    </div>
                </div>
            </Card>
        </div>
    );
};


const DoubtCard: React.FC<{ doubt: Doubt, onView: () => void }> = ({ doubt, onView }) => (
    <Card className="mb-4">
        <div className="flex items-start">
            <img className="w-10 h-10 rounded-full object-cover mr-4" src={doubt.asker.avatarUrl} alt={doubt.asker.name} />
            <div className="flex-1">
                <p className="text-[var(--text-primary)] font-medium">{doubt.question}</p>
                <div className="mt-3 flex justify-between items-center text-sm text-[var(--text-secondary)]">
                    <div>
                        <span>{doubt.asker.name} &bull; {doubt.subject}</span>
                        <span className="ml-4 hidden sm:inline">{doubt.timestamp}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${doubt.isResolved ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                            {doubt.isResolved ? 'RESOLVED' : 'UNRESOLVED'}
                        </span>
                        <button onClick={onView} className="font-semibold text-[var(--accent-blue)] hover:underline">VIEW</button>
                    </div>
                </div>
            </div>
        </div>
    </Card>
);

const AskDoubtCard: React.FC<{ onAddDoubt: (question: string, subject: string) => void; }> = ({ onAddDoubt }) => {
    const [question, setQuestion] = useState('');
    const [subject, setSubject] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(question.trim() && subject.trim()) {
            onAddDoubt(question, subject);
            setQuestion('');
            setSubject('');
        }
    };

    return (
        <Card className="mb-6">
            <h2 className="text-xl font-bold mb-4">ASK A PUBLIC DOUBT</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full p-2 rounded-lg input-high-tech"
                    rows={3}
                    placeholder="What is your query?"
                    required
                />
                <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full mt-3 p-2 rounded-lg input-high-tech"
                    placeholder="Subject (e.g., Data Structures)"
                    required
                />
                <div className="flex justify-end mt-4">
                    <button type="submit" className="btn-base btn-primary">Submit Query</button>
                </div>
            </form>
        </Card>
    );
};

const AITutor: React.FC = () => {
    const [question, setQuestion] = useState('');
    const [streamingAnswer, setStreamingAnswer] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim() || isLoading) return;

        setIsLoading(true);
        setError('');
        setStreamingAnswer('');

        try {
            const response = await askAITutor(question);
            let index = 0;
            const interval = setInterval(() => {
                setStreamingAnswer(prev => prev + response[index]);
                index++;
                if (index >= response.length) {
                    clearInterval(interval);
                    setIsLoading(false);
                }
            }, 10);
        } catch (err) {
            setError('An unexpected error occurred.');
            console.error(err);
            setIsLoading(false);
        }
    };
    
    return (
        <Card>
            <h2 className="text-xl font-bold mb-4 text-white flex items-center">
                <svg className="w-6 h-6 mr-2 text-[var(--accent-cyan)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                AI STUDY BUDDY
            </h2>
            <form onSubmit={handleSubmit}>
                <textarea 
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full p-3 rounded-lg input-high-tech"
                    rows={4}
                    placeholder="Query any academic concept..."
                    disabled={isLoading}
                />
                <button 
                    type="submit"
                    className="mt-4 w-full btn-base btn-primary disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isLoading}
                >
                    {isLoading ? 'ANALYZING...' : 'GET EXPLANATION'}
                </button>
            </form>
            {error && <p className="mt-4 text-red-500">{error}</p>}
            {(streamingAnswer || isLoading) && (
                <div className="mt-6 p-4 bg-black/30 rounded-lg font-mono">
                    <h3 className="font-semibold mb-2 text-white">RESPONSE:</h3>
                    <div className="text-sm text-cyan-300 whitespace-pre-wrap">{streamingAnswer}{isLoading && <span className="animate-ping">_</span>}</div>
                </div>
            )}
        </Card>
    );
}

interface DoubtSystemProps {
    doubts: Doubt[];
    onAddDoubt: (question: string, subject: string) => void;
    onAddAnswer: (doubtId: string, content: string) => void;
    onToggleResolve: (doubtId: string) => void;
}

const DoubtSystem: React.FC<DoubtSystemProps> = ({ doubts, onAddDoubt, onAddAnswer, onToggleResolve }) => {
    const [activeDoubt, setActiveDoubt] = useState<Doubt | null>(null);
    
    return (
        <>
        {activeDoubt && <DoubtDetailModal doubt={activeDoubt} onClose={() => setActiveDoubt(null)} onAddAnswer={onAddAnswer} onToggleResolve={onToggleResolve} />}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold mb-6 text-white tracking-wider">DOUBT CLEARANCE</h1>
                <AskDoubtCard onAddDoubt={onAddDoubt} />
                {doubts.map(doubt => <DoubtCard key={doubt.id} doubt={doubt} onView={() => setActiveDoubt(doubt)} />)}
            </div>
            <div className="sticky top-8">
                 <h1 className="text-3xl font-bold mb-6 text-transparent select-none hidden lg:block">.</h1>
                <AITutor />
            </div>
        </div>
        </>
    );
};

export default DoubtSystem;