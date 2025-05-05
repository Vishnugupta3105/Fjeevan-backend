const express = require('express');
const cors = require('cors');
const http = require('http');
const dotenv = require('dotenv');
const chatRoutes = require('./routes/chat');

// Load environment variables
dotenv.config();

// Debug logging
console.log('Environment variables loaded:', {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  HAS_OPENAI_KEY: !!process.env.OPENAI_API_KEY
});

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/chat', chatRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    env: {
      PORT: process.env.PORT,
      NODE_ENV: process.env.NODE_ENV,
      HAS_OPENAI_KEY: !!process.env.OPENAI_API_KEY
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 