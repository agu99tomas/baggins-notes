import React from 'react';
import { Container } from '@mui/material';
import PropTypes from 'prop-types';
import AppBar from './AppBar';
import Navbar from './Navbar';

export default function Layout({ children }) {
  const drawerWidth = 240;

  return (
    <div style={{ display: 'flex' }}>
      <AppBar drawerWidth={drawerWidth} />
      <Navbar drawerWidth={drawerWidth} />

      <div style={{ width: '100%', padding: '5rem 2rem' }}>
        <Container>{children}</Container>
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};
