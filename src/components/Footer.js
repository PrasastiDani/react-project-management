import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 2, textAlign: 'center', borderTop: '1px solid #ddd', mt: 3 }}>
      <Typography variant="body2" color="text.secondary">
        Created by Prasasti Dani Harry Kuncoro
      </Typography>
    </Box>
  );
};

export default Footer;
