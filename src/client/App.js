import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Notes from './pages/Notes';
import CreateNote from './pages/Create';
import SignIn from './pages/SignIn';
import './app.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/create" element={<CreateNote />} />
      </Routes>
    </Router>
  );
}

export default App;
