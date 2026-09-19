/**
 * GrowthBuddy — Application Server (Phase 2 Backend & Real-Time Sync)
 * 
 * Combines Express REST APIs, Static Frontend Serving, SQLite Database,
 * and Socket.io Real-Time Synchronization.
 * 
 * Author: GrowthBuddy Engineering Team
 * Leadership: CEO Hanzala Khan
 */

require('dotenv').config();
const http = require('http');
const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const { initDatabase } = require('./backend/database/db');
const { seedDatabase } = require('./backend/database/seed');
const { initSocketServer } = require('./backend/socket/socketHandler');
const { apiLimiter } = require('./backend/middleware/rateLimiter');

// Import Route Handlers
const authRoutes = require('./backend/routes/authRoutes');
const contactRoutes = require('./backend/routes/contactRoutes');
const customerRoutes = require('./backend/routes/customerRoutes');
const adminRoutes = require('./backend/routes/adminRoutes');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

// Initialize Database and Seed default accounts if needed
initDatabase();
seedDatabase();

// Initialize Socket.io Real-Time Engine
initSocketServer(server);

// Security & Parsing Middleware
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());

// Static Files: serve project root, assets, and pages
app.use(express.static(path.join(__dirname)));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));

// API Routes
app.use('/api', apiLimiter);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    agency: 'GrowthBuddy',
    ceo: 'Hanzala Khan',
    phase: 'Phase 2 (Backend & Real-Time Sync Active)',
    timestamp: new Date().toISOString(),
  });
});

// Fallback for SPA/Static 404
app.use((req, res) => {
  if (req.accepts('html')) {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
  } else {
    res.status(404).json({ success: false, message: 'Resource not found' });
  }
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error. Please try again later.',
  });
});

// Start Server
server.listen(PORT, () => {
  console.log('\n======================================================');
  console.log(`🚀 GrowthBuddy Agency Server running on http://localhost:${PORT}`);
  console.log('⚡ Socket.io Real-Time Synchronization is ACTIVE');
  console.log('🔒 Authentication: Admin & Customer Roles Configured');
  console.log('📦 Database: SQLite (WAL mode, parameterized)');
  console.log('======================================================\n');
});

module.exports = { app, server };
