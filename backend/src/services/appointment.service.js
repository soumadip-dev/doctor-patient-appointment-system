import Appointment from '../models/Appointment.model.js';

//* Service: Get appointments based on user role
export const getAppointmentsService = async user => {
  let filter = {};

  if (user.role === 'patient') {
    filter = { patient: user._id };
  } else if (user.role === 'doctor') {
    filter = { doctor: user._id };
  }

  const appointments = await Appointment.find(filter)
    .populate('patient', 'name email')
    .populate('doctor', 'name specialization')
    .sort({ date: 1 });

  return appointments;
};

//* Service: Create a new appointment
export const createAppointmentService = async (user, doctor, date, reason) => {
  const appointment = await Appointment.create({
    patient: user._id,
    doctor,
    date,
    reason,
  });

  const populatedAppointment = await Appointment.findById(appointment._id)
    .populate('patient', 'name email')
    .populate('doctor', 'name specialization');

  return populatedAppointment;
};

//* Service: Update appointment status
export const updateAppointmentStatusService = async (id, status) => {
  const appointment = await Appointment.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  )
    .populate('patient', 'name email')
    .populate('doctor', 'name specialization');

  return appointment;
};
