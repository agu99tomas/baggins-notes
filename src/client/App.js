import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './config/theme';
import useUserData from './hooks/useUserData';
import Notes from './pages/Notes';
import CreateNote from './pages/Create';
import SignIn from './pages/SignIn';
import './app.css';
import Layout from './components/Layout';

function App() {
  const { userData, setUserData } = useUserData();
  if (!userData) return <SignIn setUserData={setUserData} />;

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Notes />} />
            <Route path="/create" element={<CreateNote />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
