import { useState } from 'react';
import { appointmentService } from '../services/appointmentService';
import { prescriptionService } from '../services/prescriptionService';
import { doctorService } from '../services/doctorService';

export const useApi = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await doctorService.getDoctors();
      setDoctors(response.data.data); // Changed from response.data to response.data.data
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching doctors');
    } finally {
      setLoading(false);
    }
  };

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

  const createAppointment = async appointmentData => {
    try {
      setLoading(true);
      await appointmentService.createAppointment(appointmentData);
      await fetchAppointments();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Booking failed' };
    } finally {
      setLoading(false);
    }
  };

  return {
    doctors,
    appointments,
    prescriptions,
    loading,
    error,
    fetchDoctors,
    fetchAppointments,
    fetchPrescriptions,
    createAppointment,
  };
};
