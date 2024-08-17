'use client';

import Image from 'next/image';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Button, Toolbar, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import logo from '../../public/logo.png';

export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    router.push(path);
    handleMenuClose();
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#b8dbd9', borderRadius: 5 }}>
      <Toolbar>
        <Image 
          src={logo} 
          alt="QuizCrafter Logo" 
          width={60} 
          height={50} 
          style={{ marginRight: '24px', borderRadius: 3 }} 
        />
        <Typography 
          variant="h4" 
          sx={{ flexGrow: 1, color: '#000000', cursor: 'pointer' }} 
          onClick={handleLogoClick}
        >
          QuizCrafter
        </Typography>
        <IconButton 
          edge="start" 
          color="inherit" 
          aria-label="menu" 
          sx={{ mr: 2 }} 
          onClick={handleMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleMenuItemClick('/about')}>About</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('/flashcards')}>Saved Flashcards</MenuItem>
        </Menu>
        <SignedOut>
          <Button color='inherit' href="/sign-in">Login</Button>
          <Button color='inherit' href="/sign-up">Sign Up</Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </Toolbar>
    </AppBar>
  );
}