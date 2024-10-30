import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { registerUser } from '../../services/mockAuth';
import { setUser, setIndustry, setLoading, setError } from '../../store/authSlice';

const industries = [
  'ecommerce',
  'education',
  'finance',
  'government',
  'healthcare',
  'insurance',
  'realestate',
  'retail',
  'supplychain',
  'telecom'
];

const RegisterForm = ({ onToggleForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    industry: ''
  });
  const [loading, setIsLoading] = useState(false);
  const [error, setLocalError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setLocalError('');
    dispatch(setLoading(true));

    try {
      const user = await registerUser(formData.email, formData.password);
      dispatch(setUser(user));
      dispatch(setIndustry(formData.industry));
      dispatch(setError(null));
      navigate('/dashboard');
    } catch (error) {
      setLocalError(error.message);
      dispatch(setError(error.message));
    } finally {
      setIsLoading(false);
      dispatch(setLoading(false));
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Register
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={formData.email}
        onChange={handleChange}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        value={formData.password}
        onChange={handleChange}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel id="industry-label">Industry</InputLabel>
        <Select
          labelId="industry-label"
          id="industry"
          name="industry"
          value={formData.industry}
          label="Industry"
          onChange={handleChange}
          required
        >
          {industries.map((industry) => (
            <MenuItem key={industry} value={industry}>
              {industry.charAt(0).toUpperCase() + industry.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Register'}
      </Button>

      <Button
        fullWidth
        variant="text"
        onClick={onToggleForm}
        sx={{ mt: 1 }}
      >
        Already have an account? Sign In
      </Button>
    </Box>
  );
};

export default RegisterForm;
