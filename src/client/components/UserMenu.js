import React from 'react';
import {
  Menu, MenuItem, Avatar, IconButton,
} from '@mui/material/';
import ls from 'local-storage';
import { useNavigate } from 'react-router-dom';

export default function UserMenu() {
  const navigate = useNavigate();
  const userInitials = ls('userData').initials;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const signOut = () => {
    closeMenu();
    ls.remove('userData');
    navigate('/');
  };

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={openMenu}
        color="inherit"
      >
        <Avatar>{userInitials}</Avatar>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem onClick={signOut}>Sign out</MenuItem>
      </Menu>
    </>
  );
}
