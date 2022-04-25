import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import useToken from './hooks/useToken';
import Notes from './pages/Notes';
import CreateNote from './pages/CreateNote';
import SignIn from './pages/SignIn';
import './app.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F7D4BC',
    },
    secondary: purple,
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

function App() {
  const { token, setToken } = useToken();

  if (!token) return <SignIn setToken={setToken} />;

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Notes />} />
          <Route path="/createnote" element={<CreateNote />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
