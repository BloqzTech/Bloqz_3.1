import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import {
  Videocam as VideoIcon,
  VideocamOff as VideoOffIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  ScreenShare as ScreenShareIcon,
  StopScreenShare as StopScreenShareIcon,
  Chat as ChatIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  CallEnd as EndCallIcon,
} from '@mui/icons-material';

const VideoConference = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [joinDialog, setJoinDialog] = useState(true);
  const [platform, setPlatform] = useState('');
  const [meetingId, setMeetingId] = useState('');
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [participants, setParticipants] = useState([
    { id: 1, name: 'You', isHost: true },
    { id: 2, name: 'John Doe', isHost: false },
    { id: 3, name: 'Jane Smith', isHost: false },
  ]);

  const handleJoinMeeting = () => {
    // TODO: Implement actual meeting join logic
    setIsJoined(true);
    setJoinDialog(false);
  };

  const handleEndCall = () => {
    // TODO: Implement call end logic
    setIsJoined(false);
    setJoinDialog(true);
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {isJoined ? (
        <>
          {/* Main Conference Area */}
          <Box sx={{ flex: 1, p: 2, bgcolor: 'grey.900' }}>
            <Grid container spacing={2}>
              {/* Participant Videos */}
              {participants.map((participant) => (
                <Grid item xs={12} sm={6} md={4} key={participant.id}>
                  <Paper
                    sx={{
                      position: 'relative',
                      paddingTop: '56.25%', // 16:9 aspect ratio
                      bgcolor: 'grey.800',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        left: 8,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      {!isAudioOn && <MicOffIcon fontSize="small" />}
                      <Typography variant="body2">
                        {participant.name}
                        {participant.isHost && ' (Host)'}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Controls */}
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              bgcolor: 'grey.900',
              color: 'white',
            }}
          >
            <IconButton
              color={isAudioOn ? 'primary' : 'error'}
              onClick={toggleAudio}
            >
              {isAudioOn ? <MicIcon /> : <MicOffIcon />}
            </IconButton>
            <IconButton
              color={isVideoOn ? 'primary' : 'error'}
              onClick={toggleVideo}
            >
              {isVideoOn ? <VideoIcon /> : <VideoOffIcon />}
            </IconButton>
            <IconButton
              color={isScreenSharing ? 'primary' : 'inherit'}
              onClick={toggleScreenShare}
            >
              {isScreenSharing ? <StopScreenShareIcon /> : <ScreenShareIcon />}
            </IconButton>
            <IconButton color="inherit">
              <ChatIcon />
            </IconButton>
            <IconButton color="inherit">
              <PeopleIcon />
            </IconButton>
            <IconButton color="inherit">
              <SettingsIcon />
            </IconButton>
            <IconButton color="error" onClick={handleEndCall}>
              <EndCallIcon />
            </IconButton>
          </Paper>
        </>
      ) : (
        <Dialog open={joinDialog} maxWidth="sm" fullWidth>
          <DialogTitle>Join Video Conference</DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Platform</InputLabel>
                <Select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  label="Platform"
                >
                  <MenuItem value="zoom">Zoom</MenuItem>
                  <MenuItem value="teams">Microsoft Teams</MenuItem>
                  <MenuItem value="meet">Google Meet</MenuItem>
                  <MenuItem value="facetime">FaceTime</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Meeting ID or Link"
                value={meetingId}
                onChange={(e) => setMeetingId(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Schedule Meeting
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Create a new meeting and invite participants
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Schedule</Button>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Quick Meeting
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Start an instant meeting and share the link
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Start</Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setJoinDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleJoinMeeting}
              disabled={!platform || !meetingId}
            >
              Join Meeting
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default VideoConference;
