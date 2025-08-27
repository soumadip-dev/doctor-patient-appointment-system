import { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { useApi } from './hooks/useApi';
import { Header } from './components/Layout/Header';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { Appointments } from './components/Dashboard/Appointments';
import { Prescriptions } from './components/Dashboard/Prescriptions';
import { PrescriptionForm } from './components/Dashboard/PrescriptionForm';

function App() {
  const { user, login, register, logout, checkAuthStatus } = useAuth();
  const {
    appointments,
    prescriptions,
    fetchAppointments,
    fetchPrescriptions,
    updateAppointmentStatus,
    createPrescription,
  } = useApi();

  const [showRegister, setShowRegister] = useState(false);
  const [showPrescriptionForm, setShowPrescriptionForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      await checkAuthStatus();
      setLoading(false);
    };
    initializeAuth();
  }, []);

  useEffect(() => {
    if (user) {
      fetchAppointments();
      fetchPrescriptions();
    }
  }, [user]);

  const handleLogin = async loginData => {
    const result = await login(loginData);
    if (result.success) {
      // Data will be fetched automatically by the useEffect above
    } else {
      alert(result.error);
    }
  };

  const handleRegister = async registerData => {
    const result = await register(registerData);
    if (result.success) {
      setShowRegister(false);
      // Data will be fetched automatically by the useEffect above
    } else {
      alert(result.error);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleUpdateAppointmentStatus = async (appointmentId, status) => {
    const result = await updateAppointmentStatus(appointmentId, status);
    if (result.success && status === 'completed') {
      const appointment = appointments.find(a => a._id === appointmentId);
      setSelectedAppointment(appointment);
      setShowPrescriptionForm(true);
    } else if (!result.success) {
      alert(result.error);
    }
  };

  const handlePrescriptionSubmit = async prescriptionData => {
    const result = await createPrescription(prescriptionData);
    if (result.success) {
      setShowPrescriptionForm(false);
      setSelectedAppointment(null);
    } else {
      alert(result.error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">Loading...</div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-md mx-auto mt-8 p-6">
          {!showRegister ? (
            <Login onLogin={handleLogin} onSwitchToRegister={() => setShowRegister(true)} />
          ) : (
            <Register onRegister={handleRegister} onSwitchToLogin={() => setShowRegister(false)} />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={handleLogout} />

      <div className="container mx-auto px-4 py-8">
        <Appointments appointments={appointments} onUpdateStatus={handleUpdateAppointmentStatus} />

        {showPrescriptionForm && selectedAppointment && (
          <PrescriptionForm
            appointment={selectedAppointment}
            onSubmit={handlePrescriptionSubmit}
            onCancel={() => setShowPrescriptionForm(false)}
          />
        )}

        <Prescriptions prescriptions={prescriptions} />
      </div>
    </div>
  );
}

export default App;
