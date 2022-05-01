import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid } from '@mui/material';
import axiosConfig from '../config/axiosConfig';
import NoteCard from '../components/NoteCard';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const config = axiosConfig();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/notes', config);
        setNotes(response.data.data);
      } catch (err) {
        // eslint-disable-next-line no-alert
        alert('ERROR!');
      }
    }
    fetchData();
  }, [notes]);

  return (
    <Container>
      <Grid container spacing={3}>
        {notes.map(note => (
          <Grid item key={note._id} xs={12} sm={6} md={5} lg={4}>
            <NoteCard note={note} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
