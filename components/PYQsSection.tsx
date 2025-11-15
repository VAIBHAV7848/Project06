import React, { useState } from 'react';
import { ACADEMIC_DATA } from '../constants';
import Card from './Card';
import { PYQ, DepartmentData, Semester, Subject } from '../types';
import { FlagIcon } from './Icons'; // Assuming you have a FlagIcon

const base64ToBlob = (base64: string, contentType: string) => {
  const byteCharacters = atob(base64.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
};

const ReportModal: React.FC<{ pyq: PYQ, onClose: () => void }> = ({ pyq, onClose }) => {
    const [reportText, setReportText] = useState('');

    const handleSubmit = () => {
        if (!reportText.trim()) {
            alert("Please describe the issue.");
            return;
        }
        // In a real app, this would send the report to a server
        console.log(`Report for ${pyq.title}: ${reportText}`);
        alert("Thank you for your feedback. The issue has been reported.");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-2">Report Issue</h2>
                <h3 className="text-lg font-semibold text-[var(--accent-purple)] mb-6">{pyq.title}</h3>
                <textarea
                    value={reportText}
                    onChange={(e) => setReportText(e.target.value)}
                    className="w-full p-3 rounded-lg input-high-tech"
                    rows={4}
                    placeholder="Please describe the issue (e.g., wrong file, blurry content, missing pages...)"
                />
                <div className="flex justify-end space-x-4 mt-8">
                    <button onClick={onClose} className="btn-base btn-secondary">Cancel</button>
                    <button onClick={handleSubmit} className="btn-base btn-primary">Submit Report</button>
                </div>
            </Card>
        </div>
    );
};


const PYQCard: React.FC<{ pyq: PYQ }> = ({ pyq }) => {
  const [isReportModalOpen, setReportModalOpen] = useState(false);

  const handleDownload = () => {
    if (!pyq.fileContent) {
        alert("File content is not available for download.");
        return;
    }
    const blob = base64ToBlob(pyq.fileContent, 'application/octet-stream');
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = pyq.fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  };
  return(
    <>
    {isReportModalOpen && <ReportModal pyq={pyq} onClose={() => setReportModalOpen(false)} />}
    <Card className="flex flex-col justify-between" padding="p-0">
      <div className="p-5">
        <h3 className="text-lg font-bold text-[var(--accent-purple)]">{pyq.title}</h3>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          {pyq.subject}
        </p>
        <div className="flex items-center mt-4 text-sm text-[var(--text-primary)]">
          <img className="w-8 h-8 rounded-full object-cover mr-2" src={pyq.uploader.avatarUrl} alt={pyq.uploader.name} />
          <div>
            <p className="font-semibold">{pyq.uploader.name}</p>
            <p className="text-xs text-[var(--text-secondary)]">Uploaded on {pyq.uploadDate}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-2 p-4 bg-black/20 border-t border-[var(--border-color)]">
        <button onClick={() => setReportModalOpen(true)} className="text-[var(--text-secondary)] hover:text-red-500 transition-colors" title="Report Issue">
            <FlagIcon />
        </button>
        <button onClick={handleDownload} className="btn-base btn-purple text-sm !py-1.5 !px-4">
          Download
        </button>
      </div>
    </Card>
    </>
  );
}

const SelectionCard: React.FC<{ title: string, onClick: () => void }> = ({ title, onClick }) => (
    <div
      onClick={onClick}
      className="holographic-corners bg-clip-padding backdrop-filter backdrop-blur-md bg-[var(--glass-bg)] border border-[var(--border-color)] rounded-lg p-6 flex justify-between items-center cursor-pointer hover:border-[var(--border-hover)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(56,189,248,0.2)]"
    >
      <h3 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
      <svg className="w-6 h-6 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
    </div>
);

const Breadcrumb: React.FC<{
  items: string[];
  onNavigate: (level: number) => void;
}> = ({ items, onNavigate }) => (
  <nav aria-label="Breadcrumb" className="mb-6 flex items-center space-x-2 text-sm text-[var(--text-secondary)]">
    <button onClick={() => onNavigate(0)} className="hover:text-[var(--accent-purple)] hover:underline">
      Departments
    </button>
    {items.map((item, index) => (
      <React.Fragment key={item}>
        <span>/</span>
        <button
          onClick={() => onNavigate(index + 1)}
          className={`${index === items.length - 1 ? 'font-semibold text-[var(--text-primary)]' : 'hover:text-[var(--accent-purple)] hover:underline'}`}
          aria-current={index === items.length - 1 ? 'page' : undefined}
        >
          {item}
        </button>
      </React.Fragment>
    ))}
  </nav>
);

interface PYQsSectionProps {
    pyqs: PYQ[];
}

const PYQsSection: React.FC<PYQsSectionProps> = ({ pyqs }) => {
  const [selectedDept, setSelectedDept] = useState<DepartmentData | null>(null);
  const [selectedSem, setSelectedSem] = useState<Semester | null>(null);
  const [selectedSubj, setSelectedSubj] = useState<Subject | null>(null);

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
    
    const filteredPyqs = pyqs.filter(pyq => pyq.subjectCode === selectedSubj.code);

    return (
        filteredPyqs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredPyqs.map(pyq => <PYQCard key={pyq.id} pyq={pyq} />)}
            </div>
        ) : (
            <div className="text-center py-12">
                <p className="text-[var(--text-secondary)]">No PYQs found for this subject.</p>
            </div>
        )
    );
  };

  const breadcrumbItems = [selectedDept?.name, selectedSem?.name, selectedSubj?.name].filter(Boolean) as string[];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white tracking-wider">PREVIOUS YEAR QUESTIONS</h1>
      </div>

      <Breadcrumb items={breadcrumbItems} onNavigate={handleNavigation} />

      {renderContent()}
    </div>
  );
};

export default PYQsSection;