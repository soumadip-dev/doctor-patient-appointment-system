import api from './api';

export const appointmentService = {
  getAppointments: () => api.get('/appointments'),
  updateAppointment: (id, data) => api.patch(`/appointments/${id}`, data),
};
