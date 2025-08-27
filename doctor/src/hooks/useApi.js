import { useState } from 'react';
import { appointmentService, prescriptionService } from '../services';

export const useApi = () => {
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await appointmentService.getAppointments();
      setAppointments(response.data.data.appointments);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching appointments');
    } finally {
      setLoading(false);
    }
  };

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      const response = await prescriptionService.getPrescriptions();
      setPrescriptions(response.data.data.prescriptions);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching prescriptions');
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      await appointmentService.updateAppointment(appointmentId, { status });
      await fetchAppointments();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Update failed' };
    }
  };

  const createPrescription = async prescriptionData => {
    try {
      await prescriptionService.createPrescription(prescriptionData);
      await fetchPrescriptions();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Creation failed' };
    }
  };

  return {
    appointments,
    prescriptions,
    loading,
    error,
    fetchAppointments,
    fetchPrescriptions,
    updateAppointmentStatus,
    createPrescription,
  };
};
