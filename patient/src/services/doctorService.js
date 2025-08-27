import api from './api';

export const doctorService = {
  getDoctors: () => api.get('/auth/doctors'),
};
