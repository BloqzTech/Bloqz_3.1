const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

// Route Imports
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const fileRoutes = require('./routes/files');
const communicationRoutes = require('./routes/communication');
const integrationRoutes = require('./routes/integrations');
const chainRoutes = require('./routes/chains');
const mobileRoutes = require('./routes/mobile');

// Middleware Imports
const { authenticateToken } = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Security and Performance Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// WebSocket Connection Handler
wss.on('connection', (ws, req) => {
  ws.isAlive = true;

  ws.on('pong', () => {
    ws.isAlive = true;
  });

  ws.on('message', async (message) => {
    try {
      const data = JSON.parse(message);
      
      // Verify JWT token
      const token = data.token;
      if (!token) {
        ws.send(JSON.stringify({ error: 'Unauthorized' }));
        return;
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          ws.send(JSON.stringify({ error: 'Invalid token' }));
          return;
        }
        
        // Handle different message types
        switch (data.type) {
          case 'chat':
            // Handle chat messages
            break;
          case 'notification':
            // Handle notifications
            break;
          case 'status':
            // Handle status updates
            break;
          default:
            ws.send(JSON.stringify({ error: 'Invalid message type' }));
        }
      });
    } catch (error) {
      ws.send(JSON.stringify({ error: 'Invalid message format' }));
    }
  });
});

// Ping/Pong to keep connections alive
const interval = setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) return ws.terminate();
    
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on('close', () => {
  clearInterval(interval);
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', authenticateToken, profileRoutes);
app.use('/api/files', authenticateToken, fileRoutes);
app.use('/api/communication', authenticateToken, communicationRoutes);
app.use('/api/integrations', authenticateToken, integrationRoutes);
app.use('/api/chains', authenticateToken, chainRoutes);
app.use('/api/mobile', authenticateToken, mobileRoutes);

// Error Handling
app.use(errorHandler);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

module.exports = app;
