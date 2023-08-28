import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import TagIcon from "@mui/icons-material/Tag";
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import "../firebase";
import { getAuth, signOut } from 'firebase/auth';

function Header() {
  const { user, theme } = useSelector((state) => state);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenMenu = (evebt) => {
    setAnchorEl(evebt.currentTarget);
  };

  const handleCloseMenu = () => setAnchorEl(null);
  const handleLogout = async () => {
   await signOut(getAuth());
  }

  return (
    <>
      <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer+1, color: "#9A939B", backgroundColor:"#4c3c4c"}}>
        <Toolbar sx={{display: "flex", justifyContent: "space-between", height: "50px"}}>
          <Box sx={{ display: "flex" }}>
            <TagIcon />
            <Typography variant="h6" component="div">
              SLACK
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={handleOpenMenu}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ color: "#9A939B" }}
                >
                  {user.currentUser?.displayName}
                </Typography>
                <Avatar
                  sx={{ ml: "10px" }}
                  alt="profileImage"
                  src={user.currentUser?.photoURL}
                />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem>
                  <Typography textAlign="center">프로필이미지</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Log Out</Typography>
                </MenuItem>
              </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
};

export default Header;