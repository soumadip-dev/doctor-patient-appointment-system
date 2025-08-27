import api from './api';

export const prescriptionService = {
  getPrescriptions: () => api.get('/prescriptions'),
  createPrescription: data => api.post('/prescriptions', data),
};
