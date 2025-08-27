import api from './api';

export const appointmentService = {
  getAppointments: () => api.get('/appointments'),
  createAppointment: data => api.post('/appointments', data),
};
