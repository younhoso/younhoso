import React from 'react';
import { Avatar, Grid, LiskItem, ListItemAvatar, ListItemText } from '@mui/material'

function ChatMessage() {
  return (
    <LiskItem>
      <ListItemAvatar sx={{alignSelf: "stretch"}}>
        <Avatar variant='rounded' sx={{width:50, height:50}} alt="profile image"/>
      </ListItemAvatar>
      <Grid container sx={{ml:2}}>
        <Grid item xs={12} sx={{display: "flex", justifyContent: "left" }}>
          <ListItemText 
            sx={{display: "flex"}} 
            primary={"닉네임"} 
            primaryTypographyProps={{fontWeight:"bold", color:"orange"}} 
            secondary={"2022.01.01"}
            secondaryTypographyProps={{color: "gray", ml: 1}}
          />
        </Grid>
        <Grid item xs={12}>
          {/* TODO 이미지 추가 */}
        </Grid>
      </Grid>
    </LiskItem>
  )
}

export default ChatMessage
