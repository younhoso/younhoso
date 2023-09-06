import React from 'react'
import ChatHeader from './ChatHeader'
import { Divider, Grid, List, Paper, Toolbar } from '@mui/material'
import { useSelector } from 'react-redux'

function Chat() {
  const { channel } = useSelector((state) => state);
  console.log(channel)


  return (
    <>
      <Toolbar />
      <ChatHeader channelInfo={channel.currentChannel}/>
      <Grid container component={Paper} variant="outlined" sx={{mt:3, position:'relative'}}>
        <List sx={{height: "calc(100vh - 350px)", overflow:"scroll", width:"100%", position:"relative"}}>
          {/* 채팅메세지 */}
          
        </List>
        <Divider />
        {/* 채팅 인풋 */}
      </Grid>
    </>
  )
}


export default Chat
