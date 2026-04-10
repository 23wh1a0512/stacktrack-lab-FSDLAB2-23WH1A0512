import React from 'react';
import React, { useState, useEffect } from 'react-router-dom';
import Home from './pages/Home';
import QuestionComponent from './components/question/QuestionComponent';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/questions" element={<QuestionComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
