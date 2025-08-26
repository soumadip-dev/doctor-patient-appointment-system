import { Router } from 'express';
import { protect, authorize } from '../middleware/auth.middleware.js';

import {
  getAppointments,
  createAppointment,
  updateAppointmentStatus,
} from '../controllers/appointment.controller.js';

const router = Router();

router.get('/', protect, getAppointments);
router.post('/', protect, authorize('patient'), createAppointment);
router.patch('/:id', protect, authorize('doctor'), updateAppointmentStatus);

export default router;
