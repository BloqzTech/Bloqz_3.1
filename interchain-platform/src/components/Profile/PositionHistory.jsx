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
  FormControlLabel,
  Switch,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Work as WorkIcon,
} from '@mui/icons-material';

const PositionHistory = () => {
  const [positions, setPositions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    isCurrently: false,
    description: '',
    achievements: '',
    skills: '',
  });

  const handleOpenDialog = (index = null) => {
    if (index !== null) {
      setFormData(positions[index]);
      setEditIndex(index);
    } else {
      setFormData({
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        isCurrently: false,
        description: '',
        achievements: '',
        skills: '',
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
    const { name, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'isCurrently' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (editIndex !== null) {
        const updatedPositions = [...positions];
        updatedPositions[editIndex] = formData;
        setPositions(updatedPositions);
      } else {
        setPositions([...positions, formData]);
      }
      handleCloseDialog();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = (index) => {
    const updatedPositions = positions.filter((_, i) => i !== index);
    setPositions(updatedPositions);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Position History</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Position
        </Button>
      </Box>

      <Timeline>
        {positions.map((position, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot color="primary">
                <WorkIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6">{position.title}</Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {position.company}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {position.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`${formatDate(position.startDate)} - ${
                      position.isCurrently ? 'Present' : formatDate(position.endDate)
                    }`}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    {position.description}
                  </Typography>
                  {position.achievements && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2">Key Achievements:</Typography>
                      <Typography variant="body2">{position.achievements}</Typography>
                    </Box>
                  )}
                  {position.skills && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2">Skills Used:</Typography>
                      <Typography variant="body2">{position.skills}</Typography>
                    </Box>
                  )}
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => handleOpenDialog(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(index)}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editIndex !== null ? 'Edit Position' : 'Add Position'}
        </DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Job Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Start Date"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="End Date"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  disabled={formData.isCurrently}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isCurrently}
                      onChange={handleChange}
                      name="isCurrently"
                    />
                  }
                  label="Current Position"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Job Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Key Achievements"
                  name="achievements"
                  value={formData.achievements}
                  onChange={handleChange}
                  helperText="Enter key achievements separated by new lines"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Skills Used"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  helperText="Enter skills separated by commas"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editIndex !== null ? 'Save Changes' : 'Add Position'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PositionHistory;
