import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Private from './components/PrivateRoute';
import Notes from './pages/Notes';
import CreateNote from './pages/Create';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './app.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/notes" element={<Private component={Notes} />} />
        <Route path="/create" element={<Private component={CreateNote} />} />
      </Routes>
    </Router>
  );
}

export default App;
