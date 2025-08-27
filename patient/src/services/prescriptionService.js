import api from './api';

export const prescriptionService = {
  getPrescriptions: () => api.get('/prescriptions'),
};
