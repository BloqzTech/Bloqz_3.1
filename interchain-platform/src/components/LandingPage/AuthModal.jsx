import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Alert
} from '@mui/material';
import Button from '../Button';

const industries = [
  'Real Estate',
  'Supply Chain',
  'Telecommunications',
  'Retail',
  'Health Care',
  'Education',
  'Government',
  'E-Commerce',
  'Insurance',
  'Finance & Banking'
];

const AuthModal = ({ open, onClose, mode, selectedIndustry }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    industry: selectedIndustry || '',
    companyName: '',
    role: ''
  });
  
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (mode === 'register') {
      if (!formData.industry) {
        newErrors.industry = 'Industry is required';
      }
      if (!formData.companyName) {
        newErrors.companyName = 'Company name is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Handle form submission
        console.log('Form submitted:', formData);
        // Add your API call here
        onClose();
      } catch (error) {
        console.error('Submission error:', error);
        setErrors({ submit: 'Failed to submit. Please try again.' });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {mode === 'login' ? 'Login' : 'Create Account'}
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />

          {mode === 'register' && (
            <>
              <FormControl fullWidth margin="normal" error={!!errors.industry}>
                <InputLabel>Industry</InputLabel>
                <Select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  label="Industry"
                >
                  {industries.map(industry => (
                    <MenuItem key={industry} value={industry}>
                      {industry}
                    </MenuItem>
                  ))}
                </Select>
                {errors.industry && (
                  <Box component="span" sx={{ color: 'error.main', fontSize: '0.75rem', mt: 0.5 }}>
                    {errors.industry}
                  </Box>
                )}
              </FormControl>

              <TextField
                fullWidth
                margin="normal"
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                error={!!errors.companyName}
                helperText={errors.companyName}
              />
            </>
          )}

          {errors.submit && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {errors.submit}
            </Alert>
          )}

          <Box sx={{ mt: 3 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
            >
              {mode === 'login' ? 'Login' : 'Create Account'}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
