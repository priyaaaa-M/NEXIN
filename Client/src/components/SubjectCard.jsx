// Make sure to run: npm install react-icons
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FiBookOpen, FiPaperclip, FiPlus, FiChevronDown, FiChevronUp, FiFileText, FiFolder } from 'react-icons/fi';
import { Pin } from 'lucide-react';
import './SubjectCard.css';

const SubjectCard = ({ subject, onPin, onAddChapter, onViewNotes, onViewMaterials }) => {
  const [expanded, setExpanded] = useState(false);
  if (!subject) return null;
  const progressPercent = subject.totalChapters > 0 ? Math.round((subject.completedChapters / subject.totalChapters) * 100) : 0;
  const units = Array.isArray(subject.units) ? subject.units : [];

  return (
    <div className={`subject-card${subject.pinned ? ' pinned' : ''}`} style={{ borderColor: subject.color || '#3ecfff' }}>
      <div className="subject-header">
        <span className="subject-icon"><FiBookOpen /></span>
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
        <button onClick={() => onViewNotes(subject.id)}><FiFileText /> View Notes</button>
        <button onClick={() => onViewMaterials(subject.id)}><FiFolder /> Materials</button>
        <button onClick={() => onAddChapter(subject.id)}><FiPlus /> Add Chapter</button>
        <button className="expand-btn" onClick={() => setExpanded(prev => !prev)}>
          {expanded ? <FiChevronUp /> : <FiChevronDown />} Units
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

SubjectCard.propTypes = {
  subject: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    semester: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    color: PropTypes.string,
    completedChapters: PropTypes.number,
    totalChapters: PropTypes.number,
    pinned: PropTypes.bool,
    units: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      completed: PropTypes.bool,
      inProgress: PropTypes.bool,
      onAddNote: PropTypes.func,
      onUpload: PropTypes.func,
      onAddVideo: PropTypes.func
    }))
  }),
  onPin: PropTypes.func,
  onAddChapter: PropTypes.func,
  onViewNotes: PropTypes.func,
  onViewMaterials: PropTypes.func
};

SubjectCard.defaultProps = {
  subject: {
    units: []
  },
  onPin: () => {},
  onAddChapter: () => {},
  onViewNotes: () => {},
  onViewMaterials: () => {}
};

export default SubjectCard;
