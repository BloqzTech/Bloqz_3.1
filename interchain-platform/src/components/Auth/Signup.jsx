import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  Link,
  Alert,
  useTheme,
  IconButton,
  InputAdornment,
  Fade,
  Grow,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  PersonAdd,
  Business,
} from '@mui/icons-material';

const industries = [
  { id: 'finance', name: 'Finance' },
  { id: 'healthcare', name: 'Healthcare' },
  { id: 'education', name: 'Education' },
  { id: 'government', name: 'Government' },
  { id: 'retail', name: 'Retail' },
];

const Signup = () => {
  const theme = useTheme();
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    industry: '',
    companyName: '',
    regulatoryLicense: '',
    taxId: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateStep = () => {
    if (activeStep === 0) {
      if (!formData.email || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all fields');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return false;
      }
    } else if (activeStep === 1) {
      if (!formData.industry) {
        setError('Please select an industry');
        return false;
      }
      if (!formData.companyName) {
        setError('Please enter company name');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setError('');
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setError('');
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    try {
      setError('');
      setLoading(true);
      
      // Create user account
      const userCredential = await signup(formData.email, formData.password);
      
      // Store industry-specific data
      await fetch('/api/industry-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: userCredential.user.uid,
          industry: formData.industry,
          companyName: formData.companyName,
          regulatoryLicense: formData.regulatoryLicense,
          taxId: formData.taxId,
        }),
      });

      navigate('/dashboard');
    } catch (error) {
      setError('Failed to create account: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const steps = ['Account Setup', 'Industry Details', 'Verification'];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          background: `radial-gradient(circle at 20% 30%, ${theme.palette.primary.light} 0%, transparent 70%),
                      radial-gradient(circle at 80% 70%, ${theme.palette.secondary.light} 0%, transparent 70%)`,
        }}
      />

      <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
        <Fade in timeout={1000}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              width: '100%',
              borderRadius: 2,
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Bloqz Title */}
              <Grow in timeout={1500}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                      fontWeight: 800,
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      backgroundClip: 'text',
                      textFillColor: 'transparent',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      letterSpacing: '0.1em',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                      mb: 1,
                    }}
                  >
                    BLOQZ
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 500,
                      letterSpacing: '0.05em',
                    }}
                  >
                    Create Your Account
                  </Typography>
                </Box>
              </Grow>

              <Stepper activeStep={activeStep} sx={{ width: '100%', mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {error && (
                <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                {activeStep === 0 && (
                  <Fade in>
                    <Box>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                      />

                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleInputChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mb: 2 }}
                      />

                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        sx={{ mb: 3 }}
                      />
                    </Box>
                  </Fade>
                )}

                {activeStep === 1 && (
                  <Fade in>
                    <Box>
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Industry</InputLabel>
                        <Select
                          name="industry"
                          value={formData.industry}
                          onChange={handleInputChange}
                          required
                        >
                          {industries.map((industry) => (
                            <MenuItem key={industry.id} value={industry.id}>
                              {industry.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Company Name"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                      />

                      <TextField
                        margin="normal"
                        fullWidth
                        label="Regulatory License"
                        name="regulatoryLicense"
                        value={formData.regulatoryLicense}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                      />

                      <TextField
                        margin="normal"
                        fullWidth
                        label="Tax ID"
                        name="taxId"
                        value={formData.taxId}
                        onChange={handleInputChange}
                        sx={{ mb: 3 }}
                      />
                    </Box>
                  </Fade>
                )}

                {activeStep === 2 && (
                  <Fade in>
                    <Box sx={{ textAlign: 'center' }}>
                      <Business sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
                      <Typography variant="h6" gutterBottom>
                        Review Your Information
                      </Typography>
                      <Typography variant="body1" color="textSecondary" paragraph>
                        Please verify that all the information you've provided is correct before creating your account.
                      </Typography>
                    </Box>
                  </Fade>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                  <Button
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    sx={{ visibility: activeStep === 0 ? 'hidden' : 'visible' }}
                  >
                    Back
                  </Button>
                  
                  {activeStep === steps.length - 1 ? (
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                      sx={{
                        py: 1.5,
                        px: 4,
                        fontSize: '1.1rem',
                        textTransform: 'none',
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        boxShadow: `0 4px 10px ${theme.palette.primary.main}40`,
                        '&:hover': {
                          background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                        },
                      }}
                    >
                      Create Account
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{
                        py: 1.5,
                        px: 4,
                        fontSize: '1.1rem',
                        textTransform: 'none',
                      }}
                    >
                      Next
                    </Button>
                  )}
                </Box>

                <Box sx={{ mt: 3, textAlign: 'center' }}>
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="body2"
                    sx={{
                      color: theme.palette.primary.main,
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Already have an account? Sign In
                  </Link>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default Signup;
