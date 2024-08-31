import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <ImageIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div">
          Pixel
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
