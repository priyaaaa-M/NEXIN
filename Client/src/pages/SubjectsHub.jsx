import React, { useState } from 'react';
import SubjectCard from '../components/SubjectCard';
import '../styles/SubjectsHub.css';

// Example data structure
const initialSubjects = [
  {
    id: 1,
    name: 'Mathematics',
    semester: '1',
    color: '#3ecfff',
    completedChapters: 6,
    totalChapters: 10,
    pinned: true,
    units: [
      { id: 1, name: 'Algebra', completed: true, inProgress: false },
      { id: 2, name: 'Geometry', completed: false, inProgress: true },
      { id: 3, name: 'Trigonometry', completed: false, inProgress: false },
    ],
  },
  {
    id: 2,
    name: 'Physics',
    semester: '2',
    color: '#b983ff',
    completedChapters: 3,
    totalChapters: 12,
    pinned: false,
    units: [
      { id: 1, name: 'Mechanics', completed: false, inProgress: true },
      { id: 2, name: 'Optics', completed: false, inProgress: false },
    ],
  },
];

const SubjectsHub = () => {
  const [subjects, setSubjects] = useState(initialSubjects);

  const handlePin = (id) => {
    setSubjects(subjects => {
      return subjects.map(s => s.id === id ? { ...s, pinned: !s.pinned } : s)
        .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
    });
  };

  const handleAddChapter = (subjectId) => {
    // Placeholder: Add logic to open modal or form
    alert('Add Chapter to subject ' + subjectId);
  };

  const handleViewNotes = (subjectId) => {
    alert('View Notes for subject ' + subjectId);
  };

  const handleViewMaterials = (subjectId) => {
    alert('View Materials for subject ' + subjectId);
  };

  // Unit actions (can be enhanced later)
  const unitActions = {
    onAddNote: (unitId) => alert('Add Note to unit ' + unitId),
    onUpload: (unitId) => alert('Upload PDF to unit ' + unitId),
    onAddVideo: (unitId) => alert('Add Video Link to unit ' + unitId),
  };

  return (
    <div className="subjects-hub-bg">
      <h2 className="studio-title">📎 Academic Studio — Subjects Hub</h2>
      <div className="subjects-list">
        {subjects.map(subject => (
          <SubjectCard
            key={subject.id}
            subject={{
              ...subject,
              units: subject.units.map(u => ({ ...u, ...unitActions })),
            }}
            onPin={handlePin}
            onAddChapter={handleAddChapter}
            onViewNotes={handleViewNotes}
            onViewMaterials={handleViewMaterials}
          />
        ))}
      </div>
    </div>
  );
};

export default SubjectsHub;
