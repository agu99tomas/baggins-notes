import React from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import {
  Typography,
  Button,
  Container,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
  Box,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosConfig from '../config/axiosConfig';
import Layout from '../components/Layout';

export default function CreateNote() {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const categories = [
    'Bree',
    'The Shire',
    'Rivendell',
    'The Misty Mountains',
    "Beorn's Hall",
    'Mirkwood',
    'Esgaroth',
    'Erebor',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const body = {
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
    };

    try {
      setLoading(true);
      await axios.post('/api/notes', body, axiosConfig());
      navigate('/notes');
    } catch (err) {
      if (err.response.status === 401) navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Container>
        <Typography
          variant="h6"
          component="h2"
          color="textSecondary"
          gutterBottom
        >
          Create a New Note
        </Typography>

        <Box
          component="form"
          noValidate={false}
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            label="Title"
            name="title"
            fullWidth
            required
            sx={{ my: 3, display: 'block' }}
          />

          <TextField
            label="Description"
            name="description"
            fullWidth
            required
            multiline
            rows={4}
            sx={{ my: 3, display: 'block' }}
          />

          <FormControl sx={{ my: 3, display: 'block' }}>
            <FormLabel>Category</FormLabel>
            <RadioGroup name="category" defaultValue={categories[0]}>
              {categories.map(category => (
                <FormControlLabel
                  key={category}
                  value={category}
                  control={<Radio />}
                  label={category}
                />
              ))}
            </RadioGroup>
          </FormControl>

          {loading ? (
            <LoadingButton
              variant="contained"
              loading
              loadingPosition="start"
              startIcon={<SaveIcon />}
            >
              Loading...
            </LoadingButton>
          ) : (
            <Button
              type="submit"
              variant="contained"
              endIcon={<KeyboardArrowRightIcon />}
            >
              Submit
            </Button>
          )}
        </Box>
      </Container>
    </Layout>
  );
}
