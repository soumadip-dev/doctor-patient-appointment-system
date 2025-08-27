# Doctor-Patient Appointment System

A full-stack, web-based system enabling healthcare appointment management with distinct modules for doctors and patients.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This application allows doctors and patients to register, log in, and manage appointments via separate, role-specific interfaces, offering a streamlined healthcare scheduling experience.

## Features

- Secure user registration and authentication (doctor and patient)
- Appointment booking, viewing, and management workflows
- Role-based access control to ensure proper permissions
- Separate front-end experiences for doctors and patients

## Technology Stack

- **Backend**: Node.js, Express, MongoDB
- **Doctor Frontend**: React, Tailwind CSS
- **Patient Frontend**: React, Tailwind CSS
- **Authentication**: JWT and cookie-based authentication

## Installation

### Prerequisites

Ensure you have installed:

- Node.js (v14 or newer)
- npm (Node.js package manager)
- MongoDB (or a compatible database)

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/soumadip-dev/doctor-patient-appointment-system.git
   cd doctor-patient-appointment-system
   ```

2. **Backend setup**

   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file with:

   ```env
   MONGO_URI=<your_mongodb_uri>
   JWT_SECRET=<your_jwt_secret>
   JWT_EXPIRES_IN=<your_jwt_expires_in>
   PORT=8080
   NODE_ENV=development
   BASE_URL=<your_base_url>
   DOCTOR_URL=<your_doctor_url>
   PATIENT_URL=<your_patient_url>
   ```

   Start the backend:

   ```bash
   npm run dev
   ```

3. **Doctor frontend setup**

   ```bash
   cd ../doctor
   npm install
   npm run dev
   ```

4. **Patient frontend setup**

   ```bash
   cd ../patient
   npm install
   npm run dev
   ```

---

## Usage

- **Patient**: Register or log in → Browse doctors → Book and manage appointments
- **Doctor**: Register or log in → View incoming appointment requests → Accept, reject, or update availability

---

## API Endpoints

### Auth

- **POST** `baseUrl/api/v1/auth/register` – Register doctor or patient
- **POST** `baseUrl/api/v1/auth/login` – Login doctor or patient
- **POST** `baseUrl/api/v1/auth/logout` – Logout doctor or patient
- **GET** `baseUrl/api/v1/auth/is-auth` – Check if user is authenticated
- **GET** `baseUrl/api/v1/auth/doctors` – Get all doctors

### Appointments

- **POST** `baseUrl/api/v1/appointments` – Book an appointment
- **GET** `baseUrl/api/v1/appointments` – Get all appointments
- **PATCH** `baseUrl/api/v1/appointments/:id` – Update an appointment status

### Prescriptions

- **GET** `baseUrl/api/v1/prescriptions` – Get all prescriptions
- **POST** `baseUrl/api/v1/prescriptions` – Add a prescription

---

## Project Structure

```
doctor-patient-appointment-system/
├── backend/   # Server-side code: APIs, models, controllers
├── doctor/    # Frontend for doctors
├── patient/   # Frontend for patients
└── README.md  # Project overview and setup instructions
```

---
