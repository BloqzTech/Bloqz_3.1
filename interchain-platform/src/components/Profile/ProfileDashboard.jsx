import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Tabs,
  Tab,
  Chip,
  IconButton,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  Edit as EditIcon,
  CloudUpload as CloudUploadIcon,
  Save as SaveIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Work as WorkIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`profile-tabpanel-${index}`}
    aria-labelledby={`profile-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

function ProfileDashboard() {
  const [value, setValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  
  const [profile, setProfile] = useState({
    personal: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 234 567 8900',
      location: 'New York, USA',
    },
    professional: {
      company: 'Tech Corp',
      position: 'Senior Developer',
      department: 'Engineering',
      startDate: '2020-01-01',
    },
    credentials: [
      { type: 'certification', name: 'AWS Certified Solutions Architect', issueDate: '2021-05-15' },
      { type: 'license', name: 'Professional Engineer', issueDate: '2019-03-20' },
    ],
    companies: [
      { name: 'Tech Corp', role: 'Senior Developer', period: '2020 - Present' },
      { name: 'Innovation Inc', role: 'Developer', period: '2018 - 2020' },
    ],
  });

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setEditMode(false);
    // Add API call to save profile changes
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar
              src={profileImage}
              sx={{ width: 100, height: 100 }}
            />
            {editMode && (
              <label htmlFor="profile-image">
                <Input
                  accept="image/*"
                  id="profile-image"
                  type="file"
                  onChange={handleImageUpload}
                />
                <IconButton component="span" color="primary">
                  <CloudUploadIcon />
                </IconButton>
              </label>
            )}
          </Grid>
          <Grid item xs>
            <Typography variant="h4">
              {profile.personal.firstName} {profile.personal.lastName}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {profile.professional.position} at {profile.professional.company}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              startIcon={editMode ? <SaveIcon /> : <EditIcon />}
              onClick={() => editMode ? handleSave() : setEditMode(true)}
            >
              {editMode ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleTabChange}>
          <Tab label="Personal Info" />
          <Tab label="Professional" />
          <Tab label="Credentials" />
          <Tab label="Companies" />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Contact Information
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmailIcon sx={{ mr: 1 }} />
                  <TextField
                    fullWidth
                    label="Email"
                    value={profile.personal.email}
                    disabled={!editMode}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PhoneIcon sx={{ mr: 1 }} />
                  <TextField
                    fullWidth
                    label="Phone"
                    value={profile.personal.phone}
                    disabled={!editMode}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationIcon sx={{ mr: 1 }} />
                  <TextField
                    fullWidth
                    label="Location"
                    value={profile.personal.location}
                    disabled={!editMode}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Current Position
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <BusinessIcon sx={{ mr: 1 }} />
                  <TextField
                    fullWidth
                    label="Company"
                    value={profile.professional.company}
                    disabled={!editMode}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WorkIcon sx={{ mr: 1 }} />
                  <TextField
                    fullWidth
                    label="Position"
                    value={profile.professional.position}
                    disabled={!editMode}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Grid container spacing={2}>
          {profile.credentials.map((credential, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {credential.type.charAt(0).toUpperCase() + credential.type.slice(1)}
                  </Typography>
                  <Typography variant="body1">{credential.name}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Issued: {credential.issueDate}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={3}>
        <Grid container spacing={2}>
          {profile.companies.map((company, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{company.name}</Typography>
                  <Typography variant="subtitle1">{company.role}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {company.period}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </Box>
  );
}

export default ProfileDashboard;
