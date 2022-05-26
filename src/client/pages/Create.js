import React, { useState } from 'react';
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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config/axiosConfig';
import Layout from '../components/Layout';

export default function CreateNote() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setdescription] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setdescriptionError] = useState(false);
  const [category, setCategory] = useState('Bree');

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
    setTitleError(title === '');
    setdescriptionError(description === '');

    if (!title && !description) return;

    const body = {
      title,
      description,
      category,
    };

    try {
      await axios.post('/api/notes', body, config());
      navigate('/notes');
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert('ERROR');
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

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            onChange={e => setTitle(e.target.value)}
            error={titleError}
            label="Title"
            variant="outlined"
            fullWidth
            required
            sx={{ my: 3, display: 'block' }}
          />
          <TextField
            onChange={e => setdescription(e.target.value)}
            error={descriptionError}
            label="Description"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={4}
            sx={{ my: 3, display: 'block' }}
          />

          <FormControl sx={{ my: 3, display: 'block' }}>
            <FormLabel>Category</FormLabel>
            <RadioGroup
              onChange={e => setCategory(e.target.value)}
              value={category}
            >
              {categories.map(categoryLabel => (
                <FormControlLabel
                  key={categoryLabel}
                  value={categoryLabel}
                  control={<Radio />}
                  label={categoryLabel}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            endIcon={<KeyboardArrowRightIcon />}
          >
            Submit
          </Button>
        </form>
      </Container>
    </Layout>
  );
}
