import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  alpha,
  Fade,
  Grow,
} from '@mui/material';
import {
  AccountBalance as AccountBalanceIcon,
  LocalHospital as LocalHospitalIcon,
  School as SchoolIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';

const LandingPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const features = [
    {
      title: 'Finance',
      icon: <AccountBalanceIcon sx={{ fontSize: 40 }} />,
      description: 'Secure financial transactions and asset management',
    },
    {
      title: 'Healthcare',
      icon: <LocalHospitalIcon sx={{ fontSize: 40 }} />,
      description: 'HIPAA-compliant health data management',
    },
    {
      title: 'Education',
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      description: 'Credential verification and academic records',
    },
    {
      title: 'Government',
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      description: 'Regulatory compliance and secure documentation',
    },
    {
      title: 'Digital Assets',
      icon: <AccountBalanceWalletIcon sx={{ fontSize: 40 }} />,
      description: 'Blockchain-based asset tokenization',
    },
  ];

  return (
    <Box
      sx={{
        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        minHeight: '100vh',
        color: 'white',
      }}
    >
      {/* Hero Section */}
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" sx={{ minHeight: '90vh' }}>
          <Grid item xs={12} md={6}>
            <Fade in timeout={1000}>
              <Box>
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                  }}
                >
                  Welcome to Bloqz
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ mb: 4, textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}
                >
                  The next generation blockchain platform for enterprise solutions
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/signup')}
                    sx={{
                      backgroundColor: 'white',
                      color: theme.palette.primary.main,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.common.white, 0.9),
                      },
                    }}
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/login')}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      '&:hover': {
                        borderColor: alpha(theme.palette.common.white, 0.9),
                        backgroundColor: alpha(theme.palette.common.white, 0.1),
                      },
                    }}
                  >
                    Login
                  </Button>
                </Box>
              </Box>
            </Fade>
          </Grid>
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ backgroundColor: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            color="text.primary"
            sx={{ mb: 6, fontWeight: 600 }}
          >
            Industry Solutions
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={feature.title}>
                <Grow in timeout={1000 + index * 200}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      textAlign: 'center',
                      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: theme.shadows[8],
                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          mb: 2,
                          color: theme.palette.primary.main,
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h3"
                        sx={{ fontWeight: 600 }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
