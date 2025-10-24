import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import companyRoutes from './routes/companyRoutes.js';
import industryRoutes from './routes/industryRoutes.js';
import recommendationRoutes from './routes/recommendationRoutes.js';

// Import middleware
import { notFoundHandler, errorHandler } from './middleware/errorMiddleware.js';

// Import configuration
import config from './config/index.js';

// Import models for initialization
import { getAllCompanies } from './models/companyModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = config.server.port;

// Middleware
app.use(cors({
  origin: config.server.corsOrigin,
  credentials: true
}));
app.use(express.json());

// API Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'EncontremosPega Backend',
    totalCompanies: getAllCompanies().length
  });
});

// Register API routes
app.use('/api/companies', companyRoutes);
app.use('/api/industries', industryRoutes);
app.use('/api/recommendations', recommendationRoutes);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`🚀 Backend running on http://localhost:${port}`);
  console.log(`📊 Health check: http://localhost:${port}/api/health`);
  console.log(`🏢 Companies API: http://localhost:${port}/api/companies`);
  console.log(`🏭 Industries API: http://localhost:${port}/api/industries`);
  
  // Log companies loaded
  const totalCompanies = getAllCompanies().length;
  console.log(`📈 Loaded ${totalCompanies} companies from multiple industries`);
});