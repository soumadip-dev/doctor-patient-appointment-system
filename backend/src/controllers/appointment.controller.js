import {
  getAppointmentsService,
  createAppointmentService,
  updateAppointmentStatusService,
} from '../services/appointment.service.js';

//* Controller: Get all appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await getAppointmentsService(req.user);

    res.status(200).json({
      status: 'success',
      results: appointments.length,
      data: { appointments },
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message || 'Something went wrong' });
  }
};

//* Controller: Create new appointment
const createAppointment = async (req, res) => {
  try {
    const { doctor, date, reason } = req.body;
    const appointment = await createAppointmentService(req.user, doctor, date, reason);

    res.status(201).json({
      status: 'success',
      data: { appointment },
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message || 'Something went wrong' });
  }
};

//* Controller: Update appointment status
const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await updateAppointmentStatusService(req.params.id, status);

    if (!appointment) {
      return res.status(404).json({ status: 'error', message: 'Appointment not found' });
    }

    res.status(200).json({
      status: 'success',
      data: { appointment },
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message || 'Something went wrong' });
  }
};

export { getAppointments, createAppointment, updateAppointmentStatus };
