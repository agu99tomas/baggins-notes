import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { AddCircleOutlineOutlined, SubjectOutlined } from '@mui/icons-material';

export default function Navbar({ drawerWidth }) {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      text: 'My Notes',
      icon: <SubjectOutlined />,
      path: '/notes',
    },
    {
      text: 'Create Note',
      icon: <AddCircleOutlineOutlined />,
      path: '/create',
    },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: drawerWidth,
        '& .MuiDrawer-paper': { width: drawerWidth },
      }}
    >
      <Typography variant="h5" sx={{ padding: 1.2 }}>
        Baggins Notes
      </Typography>

      <List>
        {menuItems.map(item => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={
              location.pathname === item.path
                ? { background: '#f4f4f4' }
                : undefined
            }
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

Navbar.propTypes = {
  drawerWidth: PropTypes.number.isRequired,
};
