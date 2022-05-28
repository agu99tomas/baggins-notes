import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';

export default function ResendEmail() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const body = {
    email: location.state?.email,
    confirmUrl: `${window.location.origin}/confirmEmail`,
  };

  const handleSend = async () => {
    try {
      setLoading(true);
      await axios.post('/api/auth/resend-verify-otp', body);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setLoading(false);
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
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Check your inbox
        </Typography>

        {loading ? (
          <LoadingButton
            variant="contained"
            sx={{ mt: 6, mb: 2 }}
            loading
            loadingPosition="start"
            startIcon={<SaveIcon />}
          >
            Sending...
          </LoadingButton>
        ) : (
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 6, mb: 2 }}
            endIcon={<SendIcon />}
            disabled={!body.email}
            onClick={handleSend}
          >
            Resend email
          </Button>
        )}

        <Link component={RouterLink} to="/" variant="body2">
          Sign in
        </Link>
      </Box>
    </Container>
  );
}
