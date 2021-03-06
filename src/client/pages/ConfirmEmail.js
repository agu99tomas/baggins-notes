import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { useSearchParams, Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';

export default function ConfirmEmail() {
  const [searchParams] = useSearchParams();

  const body = {
    email: searchParams.get('email'),
    otp: searchParams.get('otp'),
  };

  useEffect(() => {
    const verifyOtp = async () => {
      try {
        await axios.post('/api/auth/verify-otp', body);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };

    const validParams = !!(body.email && body.otp);
    if (validParams) verifyOtp();
  }, []);

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
          Your email was confirmed
        </Typography>

        <Link component={RouterLink} to="/" variant="body2" sx={{ mt: 3 }}>
          Sign in
        </Link>
      </Box>
    </Container>
  );
}
