import React, { useEffect, useState } from 'react'
import ChatHeader from './ChatHeader'
import { Divider, Grid, List, Paper, Toolbar } from '@mui/material'
import { useSelector } from 'react-redux'
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import "../../firebase"
import { child, get, getDatabase, onChildAdded, orderByChild, query, ref, startAt } from 'firebase/database';

function Chat() {
  const { channel, user } = useSelector((state) => state);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if(!channel.currentChannel) return;
    async function getMessages() {
      const snapShot = await get(child(ref(getDatabase()), "messages/" + channel.currentChannel.id));
      setMessages(snapShot.val() ? Object.values(snapShot.val()) : [])
    }
    getMessages();
    return () => {
      setMessages([])
    }
  }, [channel.currentChannel])

  useEffect(() => {
    if(!channel.currentChannel) return;
    const sorted = query(
      ref(getDatabase(), 'messages/' + channel.currentChannel.id), 
      orderByChild("timestamp")
    );
    const unsubscribe = onChildAdded(
      query(sorted, startAt(Date.now())), 
      (snapshot) => 
        setMessages((oldMessages) => [...oldMessages, snapshot.val()])
    );
    
    return () => {
      unsubscribe?.();
    }
  }, [channel.currentChannel])

  return (
    <>
      <Toolbar />
      <ChatHeader channelInfo={channel.currentChannel}/>
      <Grid container component={Paper} variant="outlined" sx={{mt:3, position:'relative'}}>
        <List sx={{height: "calc(100vh - 350px)", overflow:"scroll", width:"100%", position:"relative"}}>
          {messages.map(message => (
            <ChatMessage key={message.timestamp} message={message} user={user}/>
          ))}
        </List>
        <Divider />
        <ChatInput />
      </Grid>
    </>
  )
}


export default Chat
