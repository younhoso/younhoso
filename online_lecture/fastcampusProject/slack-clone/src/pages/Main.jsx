import React from 'react';
import Header from '../components/Header';
import { Box } from '@mui/material';

function Main() {
  return (
    // TODO backgroundColor 테마 적용
    <Box sx={{display: "flex", backgroundColor: "white"}}>
      <Header />
    </Box>
  )
};

export default Main;