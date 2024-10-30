import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import Button from '../Button';

const HeroSection = ({ onGetStarted }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: 8,
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #1976d2 0%, #9c27b0 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              mb: 3
            }}
          >
            Connect. Innovate. Succeed.
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            paragraph
            sx={{ mb: 4 }}
          >
            Bloqz Interchain connects diverse networks across industries, streamlining operations, integrating systems into a unified hub for better communication and security.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={onGetStarted}
            sx={{ px: 4, py: 1.5 }}
          >
            Get Started
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
