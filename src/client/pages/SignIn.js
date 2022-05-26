import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import ls from 'local-storage';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const navigate = useNavigate();
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const body = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const res = await axios.post('/api/auth/login', body);
      const { data } = res.data;
      ls('userData', data);
      navigate('notes');
    } catch (err) {
      setError(true);
      const { status } = err.toJSON();
      if (status === 401) setErrorMessage('Email or Password wrong.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="passwordrecovery" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="signup" variant="body2">
                Don&apos;t have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Snackbar
        open={error}
        autoHideDuration={4000}
        message={errorMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={() => setError(false)}
      />
    </Container>
  );
}
