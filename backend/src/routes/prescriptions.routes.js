import { Router } from 'express';
import { createPrescription, getPrescriptions } from '../controllers/prescription.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', protect, authorize('doctor'), createPrescription); // Only doctors can create prescriptions
router.get('/', protect, getPrescriptions); // Get prescriptions for an appointment (patients get theirs, doctors get theirs)

export default router;
