import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Grid,
  Alert,
} from '@mui/material';

const industries = [
  {
    id: 'finance',
    name: 'Finance',
    fields: ['companyName', 'regulatoryLicense', 'taxId'],
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    fields: ['facilityName', 'medicalLicense', 'npi'],
  },
  {
    id: 'education',
    name: 'Education',
    fields: ['institutionName', 'accreditationNumber', 'educationalLevel'],
  },
  {
    id: 'government',
    name: 'Government',
    fields: ['agencyName', 'departmentCode', 'jurisdictionLevel'],
  },
  {
    id: 'retail',
    name: 'Retail',
    fields: ['businessName', 'merchantId', 'storeLocations'],
  },
];

const IndustrySignup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    regulatoryLicense: '',
    taxId: '',
    facilityName: '',
    medicalLicense: '',
    npi: '',
    institutionName: '',
    accreditationNumber: '',
    educationalLevel: '',
    agencyName: '',
    departmentCode: '',
    jurisdictionLevel: '',
    businessName: '',
    merchantId: '',
    storeLocations: '',
  });

  const handleIndustryChange = (event) => {
    setSelectedIndustry(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match';
    }
    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    if (!selectedIndustry) {
      return 'Please select an industry';
    }
    const industry = industries.find((ind) => ind.id === selectedIndustry);
    for (const field of industry.fields) {
      if (!formData[field]) {
        return `Please fill in ${field}`;
      }
    }
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setError('');
      setLoading(true);
      
      // Create user account
      const userCredential = await signup(formData.email, formData.password);
      
      // Add industry-specific data
      const industry = industries.find((ind) => ind.id === selectedIndustry);
      const industryData = {};
      industry.fields.forEach((field) => {
        industryData[field] = formData[field];
      });

      // Store industry-specific data
      await fetch('/api/industry-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: userCredential.user.uid,
          industry: selectedIndustry,
          data: industryData,
        }),
      });

      navigate('/dashboard');
    } catch (error) {
      setError('Failed to create account: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getIndustryFields = () => {
    if (!selectedIndustry) return null;
    
    const industry = industries.find((ind) => ind.id === selectedIndustry);
    return industry.fields.map((field) => (
      <TextField
        key={field}
        fullWidth
        label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
        name={field}
        value={formData[field]}
        onChange={handleInputChange}
        margin="normal"
        required
      />
    ));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        p: 3,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 600, width: '100%' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Industry Account Setup
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Select Industry</InputLabel>
                <Select
                  value={selectedIndustry}
                  onChange={handleIndustryChange}
                  required
                >
                  {industries.map((industry) => (
                    <MenuItem key={industry.id} value={industry.id}>
                      {industry.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                margin="normal"
              />
            </Grid>

            {selectedIndustry && (
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Industry Information
                </Typography>
                {getIndustryFields()}
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{ mt: 2 }}
              >
                Create Account
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default IndustrySignup;
