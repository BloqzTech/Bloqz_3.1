import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  VerifiedUser as VerifiedIcon,
  Pending as PendingIcon,
} from '@mui/icons-material';

const CREDENTIAL_TYPES = [
  'Certification',
  'License',
  'Degree',
  'Award',
  'Badge',
  'Training',
];

const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Government',
  'Manufacturing',
  'Retail',
  'Real Estate',
  'Insurance',
  'Telecommunications',
];

const Credentials = () => {
  const [credentials, setCredentials] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    industry: '',
    issuingOrganization: '',
    issueDate: '',
    expiryDate: '',
    credentialId: '',
    description: '',
    verificationUrl: '',
    verificationStatus: 'pending',
  });

  const handleOpenDialog = (index = null) => {
    if (index !== null) {
      setFormData(credentials[index]);
      setEditIndex(index);
    } else {
      setFormData({
        name: '',
        type: '',
        industry: '',
        issuingOrganization: '',
        issueDate: '',
        expiryDate: '',
        credentialId: '',
        description: '',
        verificationUrl: '',
        verificationStatus: 'pending',
      });
      setEditIndex(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (editIndex !== null) {
        const updatedCredentials = [...credentials];
        updatedCredentials[editIndex] = formData;
        setCredentials(updatedCredentials);
      } else {
        setCredentials([...credentials, formData]);
      }
      handleCloseDialog();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = (index) => {
    const updatedCredentials = credentials.filter((_, i) => i !== index);
    setCredentials(updatedCredentials);
  };

  const getStatusChip = (status) => {
    switch (status) {
      case 'verified':
        return (
          <Chip
            icon={<VerifiedIcon />}
            label="Verified"
            color="success"
            variant="outlined"
          />
        );
      case 'pending':
        return (
          <Chip
            icon={<PendingIcon />}
            label="Pending Verification"
            color="warning"
            variant="outlined"
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Credentials & Certifications</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Credential
        </Button>
      </Box>

      <Grid container spacing={3}>
        {credentials.map((credential, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">{credential.name}</Typography>
                  {getStatusChip(credential.verificationStatus)}
                </Box>
                <Typography variant="subtitle1" color="text.secondary">
                  {credential.type}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {credential.issuingOrganization}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Industry: {credential.industry}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`Issued: ${new Date(credential.issueDate).toLocaleDateString()}`}
                  {credential.expiryDate && 
                    ` - Expires: ${new Date(credential.expiryDate).toLocaleDateString()}`}
                </Typography>
                {credential.credentialId && (
                  <Typography variant="body2" color="text.secondary">
                    Credential ID: {credential.credentialId}
                  </Typography>
                )}
                {credential.description && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {credential.description}
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleOpenDialog(index)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(index)}>
                  <DeleteIcon />
                </IconButton>
                {credential.verificationUrl && (
                  <Button
                    size="small"
                    href={credential.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Verify
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editIndex !== null ? 'Edit Credential' : 'Add Credential'}
        </DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Credential Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Credential Type</InputLabel>
                  <Select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    label="Credential Type"
                  >
                    {CREDENTIAL_TYPES.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Industry</InputLabel>
                  <Select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    label="Industry"
                  >
                    {INDUSTRIES.map((industry) => (
                      <MenuItem key={industry} value={industry}>
                        {industry}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Issuing Organization"
                  name="issuingOrganization"
                  value={formData.issuingOrganization}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Issue Date"
                  name="issueDate"
                  type="date"
                  value={formData.issueDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Expiry Date"
                  name="expiryDate"
                  type="date"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Credential ID"
                  name="credentialId"
                  value={formData.credentialId}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Verification URL"
                  name="verificationUrl"
                  value={formData.verificationUrl}
                  onChange={handleChange}
                  helperText="URL where this credential can be verified"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editIndex !== null ? 'Save Changes' : 'Add Credential'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Credentials;
