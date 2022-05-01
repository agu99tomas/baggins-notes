import React, { useState } from 'react';
import axios from 'axios';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import config from '../config/axiosConfig';

export default function CreateNote() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setdescription] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setdescriptionError] = useState(false);
  const [category, setCategory] = useState('Bree');

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
      navigate('/');
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert('ERROR!');
    }
  };

  return (
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
          color="secondary"
          variant="outlined"
          fullWidth
          required
          sx={{ my: 3, display: 'block' }}
        />
        <TextField
          onChange={e => setdescription(e.target.value)}
          error={descriptionError}
          label="Description"
          color="secondary"
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
            <FormControlLabel
              value="Bree"
              control={<Radio color="secondary" />}
              label="Bree"
            />
            <FormControlLabel
              value="The Shire"
              control={<Radio color="secondary" />}
              label="The Shire"
            />
            <FormControlLabel
              value="Rivendell"
              control={<Radio color="secondary" />}
              label="Rivendell"
            />
            <FormControlLabel
              value="The Misty Mountains"
              control={<Radio color="secondary" />}
              label="The Misty Mountains"
            />
            <FormControlLabel
              value="Beorn's Hall"
              control={<Radio color="secondary" />}
              label="Beorn's Hall"
            />
            <FormControlLabel
              value="Mirkwood"
              control={<Radio color="secondary" />}
              label="Mirkwood"
            />
            <FormControlLabel
              value="Esgaroth"
              control={<Radio color="secondary" />}
              label="Esgaroth"
            />
            <FormControlLabel
              value="Erebor"
              control={<Radio color="secondary" />}
              label="Erebor"
            />
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
