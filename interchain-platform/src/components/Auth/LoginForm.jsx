import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Alert,
  CircularProgress 
} from '@mui/material';
import { loginUser } from '../../services/mockAuth';
import { setUser, setLoading, setError } from '../../store/authSlice';

const LoginForm = ({ onToggleForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    setIsLoading(true);
    setLocalError('');
    dispatch(setLoading(true));

    try {
      const user = await loginUser(formData.email, formData.password);
      dispatch(setUser(user));
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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: 400,
        mx: 'auto',
        p: 3
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Login
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
          {error}
        </Alert>
      )}
      
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
        sx={{ mb: 2 }}
      />
      
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={formData.password}
        onChange={handleChange}
        sx={{ mb: 3 }}
      />
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{ mb: 2, py: 1.5 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Login'}
      </Button>
      
      <Button
        fullWidth
        variant="text"
        onClick={onToggleForm}
        sx={{ mt: 1 }}
      >
        Don&apos;t have an account? Sign Up
      </Button>
    </Box>
  );
};

export default LoginForm;
