import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useToken from './hooks/useToken';
import Notes from './pages/Notes';
import CreateNote from './pages/CreateNote';
import SignIn from './pages/SignIn';
import './app.css';

function App() {
  const { token, setToken } = useToken();

  if (!token) return <SignIn setToken={setToken} />;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/createnote" element={<CreateNote />} />
      </Routes>
    </Router>
  );
}

export default App;
