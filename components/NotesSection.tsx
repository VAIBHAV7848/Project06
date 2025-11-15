import React, { useState } from 'react';
import { ACADEMIC_DATA } from '../constants';
import Card from './Card';
import { Note, DepartmentData, Semester, Subject } from '../types';

const base64ToBlob = (base64: string, contentType: string) => {
  const byteCharacters = atob(base64.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
};

const NoteCard: React.FC<{ note: Note }> = ({ note }) => {
  const handleDownload = () => {
    if (!note.fileContent) {
        alert("File content is not available for download.");
        return;
    }
    const blob = base64ToBlob(note.fileContent, 'application/octet-stream');
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = note.fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  };

  return (
  <Card className="flex flex-col justify-between" padding="p-0">
    <div className="p-5">
        <h3 className="text-lg font-bold text-[var(--accent-blue)]">{note.title}</h3>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
            {note.subject}
        </p>
        <div className="flex items-center mt-4 text-sm text-[var(--text-primary)]">
            <img className="w-8 h-8 rounded-full object-cover mr-2" src={note.uploader.avatarUrl} alt={note.uploader.name} />
            <div>
            <p className="font-semibold">{note.uploader.name}</p>
            <p className="text-xs text-[var(--text-secondary)]">Uploaded on {note.uploadDate}</p>
            </div>
        </div>
    </div>
    <div className="flex justify-between items-center mt-2 p-4 bg-black/20 border-t border-[var(--border-color)]">
      <span className="text-sm text-[var(--text-secondary)]">{note.downloads} downloads</span>
      <button onClick={handleDownload} className="btn-base btn-primary text-sm !py-1.5 !px-4">
        Download
      </button>
    </div>
  </Card>
);
}

const SelectionCard: React.FC<{ title: string, onClick: () => void }> = ({ title, onClick }) => (
    <div onClick={onClick} className="holographic-corners bg-clip-padding backdrop-filter backdrop-blur-md bg-[var(--glass-bg)] border border-[var(--border-color)] rounded-lg p-6 flex justify-between items-center cursor-pointer hover:border-[var(--border-hover)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(56,189,248,0.2)]">
      <h3 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
      <svg className="w-6 h-6 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
    </div>
);

const Breadcrumb: React.FC<{
  items: string[];
  onNavigate: (level: number) => void;
}> = ({ items, onNavigate }) => (
  <nav aria-label="Breadcrumb" className="mb-6 flex items-center space-x-2 text-sm text-[var(--text-secondary)]">
    <button onClick={() => onNavigate(0)} className="hover:text-[var(--accent-blue)] hover:underline">
      Departments
    </button>
    {items.map((item, index) => (
      <React.Fragment key={item}>
        <span>/</span>
        <button
          onClick={() => onNavigate(index + 1)}
          className={`${index === items.length - 1 ? 'font-semibold text-[var(--text-primary)]' : 'hover:text-[var(--accent-blue)] hover:underline'}`}
          aria-current={index === items.length - 1 ? 'page' : undefined}
        >
          {item}
        </button>
      </React.Fragment>
    ))}
  </nav>
);

const UploadNoteModal: React.FC<{
    onClose: () => void;
    onAddNote: (note: Omit<Note, 'id' | 'uploader' | 'uploadDate' | 'downloads'>) => void;
}> = ({ onClose, onAddNote }) => {
    const [title, setTitle] = useState('');
    const [department, setDepartment] = useState<DepartmentData | null>(null);
    const [semester, setSemester] = useState<Semester | null>(null);
    const [subject, setSubject] = useState<Subject | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [fileContent, setFileContent] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onload = (event) => {
                setFileContent(event.target?.result as string);
            };
            reader.readAsDataURL(selectedFile);
        }
    };
    
    const handleSubmit = () => {
        if (title && department && semester && subject && file) {
            onAddNote({
                title,
                department: department.name,
                semester: parseInt(semester.name.split(' ')[1]),
                subject: subject.name,
                subjectCode: subject.code,
                fileName: file.name,
                fileContent,
            });
            onClose();
        } else {
            alert('Please fill all fields and select a file.');
        }
    };

    return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-white">Upload New Datapacket</h2>
        <div className="space-y-4">
          <input type="text" placeholder="Note Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 rounded-lg input-high-tech" />
          <select onChange={e => setDepartment(ACADEMIC_DATA.find(d => d.name === e.target.value) || null)} className="w-full p-3 rounded-lg input-high-tech appearance-none">
            <option>Select Department</option>
            {ACADEMIC_DATA.map(d => <option key={d.name}>{d.name}</option>)}
          </select>
          {department && (
            <select onChange={e => setSemester(department.semesters.find(s => s.name === e.target.value) || null)} className="w-full p-3 rounded-lg input-high-tech appearance-none">
              <option>Select Semester</option>
              {department.semesters.map(s => <option key={s.name}>{s.name}</option>)}
            </select>
          )}
          {semester && (
            <select onChange={e => setSubject(semester.subjects.find(s => s.code === e.target.value) || null)} className="w-full p-3 rounded-lg input-high-tech appearance-none">
              <option>Select Subject</option>
              {semester.subjects.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
            </select>
          )}
          <input type="file" onChange={handleFileChange} className="w-full p-2 text-sm text-[var(--text-secondary)] rounded-lg input-high-tech file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--accent-blue)] file:text-black hover:file:bg-[var(--accent-cyan)] cursor-pointer" />
        </div>
        <div className="flex justify-end space-x-4 mt-8">
          <button onClick={onClose} className="btn-base btn-secondary">Cancel</button>
          <button onClick={handleSubmit} className="btn-base btn-primary">Upload</button>
        </div>
      </Card>
    </div>
    );
};


interface NotesSectionProps {
    notes: Note[];
    onAddNote: (note: Omit<Note, 'id' | 'uploader' | 'uploadDate' | 'downloads'>) => void;
}

const NotesSection: React.FC<NotesSectionProps> = ({ notes, onAddNote }) => {
  const [selectedDept, setSelectedDept] = useState<DepartmentData | null>(null);
  const [selectedSem, setSelectedSem] = useState<Semester | null>(null);
  const [selectedSubj, setSelectedSubj] = useState<Subject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNavigation = (level: number) => {
    if (level === 0) {
      setSelectedDept(null);
      setSelectedSem(null);
      setSelectedSubj(null);
    } else if (level === 1) {
      setSelectedSem(null);
      setSelectedSubj(null);
    } else if (level === 2) {
      setSelectedSubj(null);
    }
  };

  const renderContent = () => {
    if (!selectedDept) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACADEMIC_DATA.map(dept => (
            <SelectionCard key={dept.name} title={dept.name} onClick={() => setSelectedDept(dept)} />
          ))}
        </div>
      );
    }

    if (!selectedSem) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedDept.semesters.map(sem => (
            <SelectionCard key={sem.name} title={sem.name} onClick={() => setSelectedSem(sem)} />
          ))}
        </div>
      );
    }

    if (!selectedSubj) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedSem.subjects.map(subj => (
            <SelectionCard key={subj.code} title={subj.name} onClick={() => setSelectedSubj(subj)} />
          ))}
        </div>
      );
    }
    
    const filteredNotes = notes.filter(note => note.subjectCode === selectedSubj.code);

    return (
        filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredNotes.map(note => <NoteCard key={note.id} note={note} />)}
            </div>
        ) : (
            <div className="text-center py-12">
                <p className="text-[var(--text-secondary)]">No data packets found for this subject.</p>
            </div>
        )
    );
  };

  const breadcrumbItems = [selectedDept?.name, selectedSem?.name, selectedSubj?.name].filter(Boolean) as string[];

  return (
    <div>
      {isModalOpen && <UploadNoteModal onClose={() => setIsModalOpen(false)} onAddNote={onAddNote} />}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white tracking-wider">NOTES & MATERIALS</h1>
        <button onClick={() => setIsModalOpen(true)} className="btn-base btn-primary bg-cyan-500/10 !border-cyan-500/30 !text-cyan-400 hover:!border-cyan-400 hover:!text-white hover:!shadow-[0_0_15px_var(--glow-cyan)]">
          Upload Note
        </button>
      </div>

      <Breadcrumb items={breadcrumbItems} onNavigate={handleNavigation} />

      {renderContent()}
    </div>
  );
};

export default NotesSection;