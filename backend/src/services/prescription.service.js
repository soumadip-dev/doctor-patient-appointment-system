import Prescription from '../models/Prescription.model.js';
import Appointment from '../models/Appointment.model.js';

//* Service: Create a prescription
export const createPrescriptionService = async ({
  appointmentId,
  symptoms,
  diagnosis,
  medicines,
  additionalNotes,
}) => {
  const appointment = await Appointment.findById(appointmentId);

  if (!appointment) {
    throw new Error('Appointment not found');
  }

  if (appointment.status !== 'completed') {
    throw new Error('Prescription can only be created for completed appointments');
  }

  const prescription = await Prescription.create({
    appointment: appointmentId,
    symptoms,
    diagnosis,
    medicines,
    additionalNotes,
  });

  const populatedPrescription = await Prescription.findById(prescription._id).populate({
    path: 'appointment',
    populate: [
      { path: 'patient', select: 'name email' },
      { path: 'doctor', select: 'name specialization' },
    ],
  });

  return populatedPrescription;
};

//* Service: Get prescriptions for user (patient or doctor)
export const getPrescriptionsService = async user => {
  let prescriptions;
  let appointments;

  if (user.role === 'patient') {
    appointments = await Appointment.find({ patient: user.id });
  } else if (user.role === 'doctor') {
    appointments = await Appointment.find({ doctor: user.id });
  }

  const appointmentIds = appointments.map(app => app._id);

  prescriptions = await Prescription.find({ appointment: { $in: appointmentIds } }).populate({
    path: 'appointment',
    populate: [
      { path: 'patient', select: 'name email' },
      { path: 'doctor', select: 'name specialization' },
    ],
  });

  return prescriptions;
};
