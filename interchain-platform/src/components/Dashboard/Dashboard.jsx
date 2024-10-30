import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Card,
  CardContent,
  LinearProgress,
  Avatar,
  useTheme,
  Grow,
  Fade,
} from '@mui/material';
import {
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  TrendingUp,
  Assessment,
  Speed,
  Timeline,
} from '@mui/icons-material';

const Dashboard = () => {
  const theme = useTheme();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const stats = [
    {
      name: 'Active Chains',
      value: '8',
      icon: <Timeline sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      trend: '+2 this week',
    },
    {
      name: 'Total Transactions',
      value: '1,234',
      icon: <TrendingUp sx={{ fontSize: 40, color: theme.palette.success.main }} />,
      trend: '+15% vs last week',
    },
    {
      name: 'Connected Apps',
      value: '12',
      icon: <Assessment sx={{ fontSize: 40, color: theme.palette.info.main }} />,
      trend: '3 pending connections',
    },
    {
      name: 'Network Status',
      value: 'Healthy',
      icon: <Speed sx={{ fontSize: 40, color: theme.palette.success.main }} />,
      trend: '99.9% uptime',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'New transaction',
      chain: 'Finance Chain',
      time: '5 minutes ago',
      status: 'success',
    },
    {
      id: 2,
      action: 'Chain integration',
      chain: 'Healthcare Chain',
      time: '2 hours ago',
      status: 'pending',
    },
    {
      id: 3,
      action: 'Smart contract deployed',
      chain: 'Government Chain',
      time: '1 day ago',
      status: 'success',
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ backgroundColor: 'white', borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Dashboard
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton>
              <NotificationsIcon />
            </IconButton>
            <IconButton>
              <SettingsIcon />
            </IconButton>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        {/* Welcome Section */}
        <Fade in timeout={1000}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: theme.palette.primary.main,
                }}
              >
                {currentUser?.email?.[0]?.toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="h4" gutterBottom>
                  Welcome back, {currentUser?.email?.split('@')[0]}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Here's what's happening across your chains
                </Typography>
              </Box>
            </Box>
          </Box>
        </Fade>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={stat.name}>
              <Grow in timeout={1000 + index * 200}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: '100%',
                    backgroundColor: 'white',
                    borderRadius: 2,
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[4],
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h4" component="div" gutterBottom>
                    {stat.value}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                    {stat.name}
                  </Typography>
                  <Typography variant="caption" color="primary">
                    {stat.trend}
                  </Typography>
                </Paper>
              </Grow>
            </Grid>
          ))}
        </Grid>

        {/* Recent Activity */}
        <Fade in timeout={2000}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              backgroundColor: 'white',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Recent Activity
            </Typography>
            <Box>
              {recentActivity.map((activity) => (
                <Card
                  key={activity.id}
                  sx={{
                    mb: 2,
                    '&:last-child': { mb: 0 },
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: 'none',
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        {activity.action}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          backgroundColor:
                            activity.status === 'success'
                              ? theme.palette.success.light
                              : theme.palette.warning.light,
                          color:
                            activity.status === 'success'
                              ? theme.palette.success.dark
                              : theme.palette.warning.dark,
                        }}
                      >
                        {activity.status}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      {activity.chain} • {activity.time}
                    </Typography>
                    {activity.status === 'pending' && (
                      <LinearProgress
                        variant="determinate"
                        value={70}
                        sx={{ mt: 1 }}
                      />
                    )}
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Paper>
        </Fade>
      </Box>
    </Box>
  );
};

export default Dashboard;
