import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ENV } from './config/env.config.js';

const app = express();

const PORT = ENV.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ENV.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());``

//* Root Route
app.get('/', (req, res) => res.send('Hello from the backend!'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
