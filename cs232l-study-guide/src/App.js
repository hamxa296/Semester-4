import React, { useState } from 'react';
import StudyGuide from './CS232L_Study_Guide';
import MidExamPractice from './CS232L_MidExam_Practice';
import Practice2 from './CS232L_MidExam_Practice2';
import PostMidStudyGuide from './CS232L_Post_Mid_Study_Guide';
import FinalExamPractice from './CS232L_FinalExam_Practice';
import AI221L_Study_Guide from './AI221L_Study_Guide';

function App() {
  const [activeComponent, setActiveComponent] = useState('studyGuide'); // 'studyGuide', 'midExam', 'practice2', 'postMid', or 'finalExam'

  return (
    <div className="App">
      <div style={{ padding: '20px', background: '#0a0a12', color: '#e8e8f0', textAlign: 'center' }}>
        <button 
          onClick={() => setActiveComponent('studyGuide')} 
          style={{ margin: '0 10px', padding: '10px 20px', background: activeComponent === 'studyGuide' ? '#7ecfff' : '#333', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Study Guide
        </button>
        <button 
          onClick={() => setActiveComponent('midExam')} 
          style={{ margin: '0 10px', padding: '10px 20px', background: activeComponent === 'midExam' ? '#7ecfff' : '#333', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Mid Exam Practice
        </button>
        <button 
          onClick={() => setActiveComponent('practice2')} 
          style={{ margin: '0 10px', padding: '10px 20px', background: activeComponent === 'practice2' ? '#7ecfff' : '#333', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Practice 2
        </button>
        <button 
          onClick={() => setActiveComponent('postMid')} 
          style={{ margin: '0 10px', padding: '10px 20px', background: activeComponent === 'postMid' ? '#7ecfff' : '#333', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Post-Mid Guide
        </button>
        <button 
          onClick={() => setActiveComponent('finalExam')} 
          style={{ margin: '0 10px', padding: '10px 20px', background: activeComponent === 'finalExam' ? '#7ecfff' : '#333', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Final Exam Practice
        </button>
        <button 
          onClick={() => setActiveComponent('aiStudyGuide')} 
          style={{ margin: '0 10px', padding: '10px 20px', background: activeComponent === 'aiStudyGuide' ? '#7ecfff' : '#333', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          AI Study Guide
        </button>
      </div>
      {activeComponent === 'studyGuide' && <StudyGuide />}
      {activeComponent === 'midExam' && <MidExamPractice />}
      {activeComponent === 'practice2' && <Practice2 />}
      {activeComponent === 'postMid' && <PostMidStudyGuide />}
      {activeComponent === 'finalExam' && <FinalExamPractice />}
      {activeComponent === 'aiStudyGuide' && <AI221L_Study_Guide />}
    </div>
  );
}

export default App;