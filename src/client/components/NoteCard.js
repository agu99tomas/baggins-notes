import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import axios from 'axios';
import config from '../config/axiosConfig';

export default function NoteCard({ note }) {
  const deleteNote = async (id) => {
    try {
      await axios.delete(`/api/notes/${id}`, config());
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert('ERROR');
    }
  };

  return (
    <Card elevation={1}>
      <CardHeader
        action={(
          <IconButton onClick={() => deleteNote(note._id)}>
            <DeleteOutlined />
          </IconButton>
        )}
        title={note.title}
        subheader={note.category}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {note.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

NoteCard.propTypes = {
  note: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
};
