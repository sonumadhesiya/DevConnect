const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Load env vars
dotenv.config();
connectDB();
// Route files
const auth = require('./routes/auth');
const profiles = require('./routes/profile');
const projects = require('./routes/project');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/auth', auth);
app.use('/api/profiles', profiles);
app.use('/api/projects', projects);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
