import React from 'react';
import Header from '../components/Header';
import { Box, Drawer, Toolbar } from '@mui/material';
import ChannelMenu from '../components/ChannelMenu';
import Chat from '../components/Chat/Chat';

function Main() {
  return (
    // TODO backgroundColor 테마 적용
    <Box sx={{display: "flex", backgroundColor: "white"}}>
      <Header />
      <Drawer variant='permanent' sx={{width: 300}} className='no-scroll'>
        <Toolbar />
        <Box sx={{display:"flex", minHeight:"calc(100vh - 64px)"}}>
          <ChannelMenu/>
        </Box>
      </Drawer>
      <Box component="main" sx={{flexGrow:1, p:3}}>
        <Chat />
      </Box>
    </Box>
  )
};

export default Main;