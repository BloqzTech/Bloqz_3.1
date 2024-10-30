import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import { IntegrationProvider } from './contexts/IntegrationContext';
import PrivateRoute from './components/Auth/PrivateRoute';

// Layout Components
import MainLayout from './components/Layout/MainLayout';
import MobileLayout from './components/Layout/MobileLayout';

// Auth Components
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ForgotPassword from './components/Auth/ForgotPassword';

// Dashboard Components
import Dashboard from './components/Dashboard/Dashboard';
import ProfileDashboard from './components/Profile/ProfileDashboard';
import FileExplorer from './components/FileExplorer/FileExplorer';
import CommunicationHub from './components/Communication/CommunicationHub';
import MobileManagement from './components/Mobile/MobileManagement';
import IntegrationHub from './components/Integration/IntegrationHub';

// Industry Dashboards
import FinanceDashboard from './components/Industries/Finance/Dashboard';
import HealthcareDashboard from './components/Industries/Healthcare/Dashboard';
import GovernmentDashboard from './components/Industries/Government/Dashboard';
import RetailDashboard from './components/Industries/Retail/Dashboard';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff4081',
      dark: '#c51162',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <IntegrationProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/register" element={<Signup />} /> {/* Redirect old route */}
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Private Routes */}
              <Route element={<PrivateRoute />}>
                <Route element={<MainLayout />}>
                  {/* Main Dashboard */}
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/profile" element={<ProfileDashboard />} />
                  <Route path="/files" element={<FileExplorer />} />
                  <Route path="/communication" element={<CommunicationHub />} />
                  <Route path="/mobile" element={<MobileManagement />} />
                  <Route path="/integrations" element={<IntegrationHub />} />

                  {/* Industry-specific Dashboards */}
                  <Route path="/industries/finance" element={<FinanceDashboard />} />
                  <Route path="/industries/healthcare" element={<HealthcareDashboard />} />
                  <Route path="/industries/government" element={<GovernmentDashboard />} />
                  <Route path="/industries/retail" element={<RetailDashboard />} />
                </Route>

                {/* Mobile Layout */}
                <Route element={<MobileLayout />}>
                  {/* Mobile-specific routes */}
                  <Route path="/m/*" element={<Dashboard />} />
                </Route>
              </Route>
            </Routes>
          </Router>
        </IntegrationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
