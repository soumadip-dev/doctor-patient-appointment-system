import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  BASE_URL: 'https://doctor-patient-appointment-system-rucz.onrender.com/',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  NODE_ENV: process.env.NODE_ENV,
  DOCTOR_URL: process.env.DOCTOR_URL,
  PATIENT_URL: process.env.PATIENT_URL,
};
