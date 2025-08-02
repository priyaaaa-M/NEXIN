import React, { useState } from 'react';
import { BookOpen, Pin, ChevronDown, ChevronUp, FileText, Folder, Plus } from 'lucide-react';
import '../SubjectCard.css';

const AcademicSubjectCard = ({ subject, onPin, onAddChapter, onViewNotes, onViewMaterials }) => {
  const [expanded, setExpanded] = useState(false);
  if (!subject) return null;
  const progressPercent = subject.totalChapters > 0 ? Math.round((subject.completedChapters / subject.totalChapters) * 100) : 0;
  const units = Array.isArray(subject.units) ? subject.units : [];

  return (
    <div className={`subject-card${subject.pinned ? ' pinned' : ''}`} style={{ borderColor: subject.color || '#3ecfff' }}>
      <div className="subject-header">
        <span className="subject-icon"><BookOpen /></span>
        <span className="subject-title">{subject.name} <span className="semester-tag">({subject.semester})</span></span>
        <span className="pin-icon" title="Pin subject" onClick={() => onPin(subject.id)}>
          <Pin color={subject.pinned ? subject.color : '#888'} size={20} />
        </span>
      </div>
      <div className="subject-progress">
        <span>Progress: {subject.completedChapters} / {subject.totalChapters} chapters ➤ {progressPercent}%</span>
        {progressPercent === 100 && <span className="progress-done">✅</span>}
      </div>
      <div className="subject-actions">
        <button onClick={() => onViewNotes(subject.id)}><FileText /> View Notes</button>
        <button onClick={() => onViewMaterials(subject.id)}><Folder /> Materials</button>
        <button onClick={() => onAddChapter(subject.id)}><Plus /> Add Chapter</button>
        <button className="expand-btn" onClick={() => setExpanded(prev => !prev)}>
          {expanded ? <ChevronUp /> : <ChevronDown />} Units
        </button>
      </div>
      {expanded && (
        <div className="units-accordion">
          {units.length === 0 && <div style={{color:'#b983ff'}}>No units yet.</div>}
          {units.map((unit, idx) => (
            <div key={unit.id || idx} className="unit-row">
              <span className="unit-name">Unit {idx + 1}: {unit.name}</span>
              <span className="unit-status">{unit.completed ? '✔️' : unit.inProgress ? '⏳' : ''}</span>
              <button onClick={() => unit.onAddNote ? unit.onAddNote(unit.id) : null}>Add Note</button>
              <button onClick={() => unit.onUpload ? unit.onUpload(unit.id) : null}>Upload PDF</button>
              {unit.onAddVideo && <button onClick={() => unit.onAddVideo(unit.id)}>Add Video Link</button>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AcademicSubjectCard;
