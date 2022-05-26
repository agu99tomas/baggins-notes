import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import Masonry from 'react-masonry-css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosConfig from '../config/axiosConfig';
import NoteCard from '../components/NoteCard';
import Layout from '../components/Layout';

export default function Notes() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('/api/notes', axiosConfig());
        setNotes(response.data.data);
      } catch (err) {
        const { status } = err.toJSON();
        if (status === 401) navigate('/');
        // eslint-disable-next-line no-alert
        else alert('ERROR');
      }
    }
    fetchData();
  }, [notes]);

  const breakpoints = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <Layout>
      <Container>
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {notes.map(note => (
            <div key={note._id}>
              <NoteCard note={note} />
            </div>
          ))}
        </Masonry>
      </Container>
    </Layout>
  );
}
