import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ENV } from './config/env.config.js';
import { connectDB } from './config/db.config.js';
import authRoutes from './routes/auth.routes.js';
import appointmentRoutes from './routes/appointments.routes.js';
import prescriptionRoutes from './routes/prescriptions.routes.js';
import job from './lib/cron.js';

const app = express();

const PORT = ENV.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true }));
app.use(cookieParser());

//* Cron Job
job.start();

//* Root Route
app.get('/', (req, res) => res.send('Hello from the backend!'));

//* Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/appointments', appointmentRoutes);
app.use('/api/v1/prescriptions', prescriptionRoutes);

//* Function to connect the DB and start the server
const startServer = async () => {
  try {
    await connectDB(); // Ensure DB is connected before starting the server
    app.listen(PORT, () => {
      console.info(`✔️ Server is up and running on port: ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
