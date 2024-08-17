'use client'

import Head from 'next/head';
import { useRouter } from 'next/navigation';
import getStripe from "@/utils/get-stripe";
import { Button, Container, Toolbar, Typography, Box, Grid, Paper } from "@mui/material";
import { grey } from '@mui/material/colors';
import "./globals.css";
import { useEffect, useState } from 'react';
import NavBar from './NavBar/page';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null); // State for handling the menu

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('fade-section');
      if (section && window.scrollY + window.innerHeight > section.offsetTop) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const router = useRouter();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleNavigation = (path) => {
    router.push(path);
    handleMenuClose();
  };

  const handleSubmit = async (plan) => {
    try {
      const checkoutSession = await fetch('/api/checkout_session', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
      });

      const checkoutSessionJson = await checkoutSession.json();

      if (checkoutSession.status >= 400) {
        console.error(checkoutSessionJson.error.message);
        return;
      }

      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      });

      if (error) {
        console.log(error.message);
      }
    } catch (error) {
      console.error('Error during checkout:', error.message);
    }
  };

  const handleGetStarted = () => {
    router.push('/generate');
  };

  return (
    <Container maxWidth="lg">
      <Head>
        <title>QuizCrafter</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      <NavBar />

      <Box id="fade-section"
        className={`fade-in ${isVisible ? 'visible' : ''}`}
        sx={{ textAlign: 'center', my: 4, transition: 'opacity 1s ease-in-out' }}>
        <Typography variant="h2" gutterBottom color={'#f4f4f9'}>Welcome to QuizCrafter</Typography>
        <Typography variant="h5" gutterBottom color={'#f4f4f9'}>
          An innovative platform that transforms your text into smart, study-ready flashcards. Designed for learners on the go, QuizCrafter simplifies the process of creating, organizing, and mastering content, making studying more efficient and effective.
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: '#586f7c',
            color: '#ffffff',
            transition: 'background-color 0.3s ease, transform 0.3s ease',
            borderRadius: 5,
            '&:hover': {
              backgroundColor: '#2f4550',
              transform: 'scale(1.05)',
              borderRadius: 3,
            },
          }}
          onClick={handleGetStarted}>
            Get Started
        </Button>
      </Box>
      
      <Box id="fade-section"
        className={`fade-in ${isVisible ? 'visible' : ''}`}
        sx={{ textAlign: 'center', my: 6, px: 2, transition: 'opacity 1s ease-in-out' }}>
        <Typography variant="h4" gutterBottom color={'#f4f4f9'} sx={{mb: 4}}>Features</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper id="fade-section"
              className={`fade-in ${isVisible ? 'visible' : ''}`}
              sx={{ textAlign: 'center', p:3 , borderRadius: 5, bgcolor: '#b8dbd9', transition: 'opacity 1s ease-in-out' }}elevation={3}>
              <Typography variant="h6" gutterBottom color={'#2f4550'}>Easy Text Input</Typography>
              <Typography color={'#586f7c'}>Simply input your text and let our software do the rest. Creating flashcards has never been easier.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper id="fade-section"
              className={`fade-in ${isVisible ? 'visible' : ''}`}
              sx={{ textAlign: 'center', p:3 , borderRadius: 5, bgcolor: '#b8dbd9', transition: 'opacity 1s ease-in-out' }}elevation={3}>
              <Typography variant="h6" gutterBottom color={'#2f4550'}>Smart Flashcards</Typography>
              <Typography color={'#586f7c'}>Our AI intelligence breaks down your text into concise flashcards; perfect for studying.</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper id="fade-section"
              className={`fade-in ${isVisible ? 'visible' : ''}`}
              sx={{ textAlign: 'center', p:3 , borderRadius: 5, bgcolor: '#b8dbd9', transition: 'opacity 1s ease-in-out' }}elevation={3}>
              <Typography variant="h6" gutterBottom color={'#2f4550'}>Accessible Anywhere</Typography>
              <Typography color={'#586f7c'}>Access your saved flashcards from any device, at any time. Study on the go with ease.</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom color={'#f4f4f9'} sx={{mb: 4}}>Pricing</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper id="fade-section"
              className={`fade-in ${isVisible ? 'visible' : ''}`}
              sx={{ textAlign: 'center', p:3 , border: '1px solid', borderColor: grey[300], borderRadius: 5, bgcolor: '#b8dbd9', transition: 'opacity 1s ease-in-out' }} elevation={3}>
              <Typography variant="h5" gutterBottom color={'#2f4550'}>Basic</Typography>
              <Typography variant="h6" gutterBottom color={'#2f4550'}>$3.99 / month</Typography>
              <Typography color={'#586f7c'}>Access to basic flashcard features and limited storage.</Typography>
              <Button 
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: '#586f7c', 
                color: '#ffffff',
                transition: 'background-color 0.3s ease, transform 0.3s ease',
                borderRadius: 5,
                '&:hover': {
                  backgroundColor: '#2f4550',
                  transform: 'scale(1.05)',
                  borderRadius: 3,
                 },
                 }} onClick={() => handleSubmit('basic')}>
                Choose Plan
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper id="fade-section"
              className={`fade-in ${isVisible ? 'visible' : ''}`}
              sx={{ textAlign: 'center', p:3 , border: '1px solid', borderColor: grey[300], borderRadius: 5, bgcolor: '#b8dbd9', transition: 'opacity 1s ease-in-out' }} elevation={3}>
              <Typography variant="h5" gutterBottom color={'#2f4550'}>Pro</Typography>
              <Typography variant="h6" gutterBottom color={'#2f4550'}>$7.99 / month</Typography>
              <Typography color={'#586f7c'}>Access to unlimited flashcards and storage with priority support.</Typography>
              <Button 
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: '#586f7c',
                color: '#ffffff',
                transition: 'background-color 0.3s ease, transform 0.3s ease',
                borderRadius: 5,
                '&:hover': {
                  backgroundColor: '#2f4550',
                  transform: 'scale(1.05)',
                  borderRadius: 3,
                 },
                 }} onClick={() => handleSubmit('pro')}>
                Choose Plan
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
