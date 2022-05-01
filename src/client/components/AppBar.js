import React from 'react';
import PropTypes from 'prop-types';
import { AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material';
import UserMenu from './UserMenu';

export default function AppBar({ drawerWidth }) {
  return (
    <MuiAppBar sx={{ width: `calc(100% - ${drawerWidth}px)` }} elevation={0}>
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }}>
          Welcome to the baggins notes website
        </Typography>
        <UserMenu />
      </Toolbar>
    </MuiAppBar>
  );
}

AppBar.propTypes = {
  drawerWidth: PropTypes.number.isRequired,
};
