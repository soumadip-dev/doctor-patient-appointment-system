import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ENV } from './config/env.config.js';
import { connectDB } from './config/db.config.js';

const app = express();

const PORT = ENV.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ENV.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());

//* Root Route
app.get('/', (req, res) => res.send('Hello from the backend!'));

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
