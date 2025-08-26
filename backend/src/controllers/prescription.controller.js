import {
  createPrescriptionService,
  getPrescriptionsService,
} from '../services/prescription.service.js';

//* Controller: Create prescription (doctor only)
const createPrescription = async (req, res) => {
  try {
    if (req.user.role !== 'doctor') {
      return res
        .status(403)
        .json({ status: 'error', message: 'Only doctors can create prescriptions' });
    }

    const { appointmentId, symptoms, diagnosis, medicines, additionalNotes } = req.body;

    if (!appointmentId || !symptoms || !diagnosis || !medicines) {
      return res.status(400).json({ status: 'error', message: 'All fields are required' });
    }

    const populatedPrescription = await createPrescriptionService({
      appointmentId,
      symptoms,
      diagnosis,
      medicines,
      additionalNotes,
    });

    res.status(201).json({
      status: 'success',
      data: { prescription: populatedPrescription },
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

//* Controller: Get prescriptions for a user (patient or doctor)
const getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await getPrescriptionsService(req.user);

    res.status(200).json({
      status: 'success',
      results: prescriptions.length,
      data: { prescriptions },
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

export { createPrescription, getPrescriptions };
