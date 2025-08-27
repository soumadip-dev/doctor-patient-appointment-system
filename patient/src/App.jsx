import { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { useApi } from './hooks/useApi';
import { Header } from './components/Layout/Header';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { DoctorsList } from './components/Dashboard/DoctorsList';
import { Appointments } from './components/Dashboard/Appointments';
import { Prescriptions } from './components/Dashboard/Prescriptions';
import { BookAppointment } from './components/Dashboard/BookAppointment';

function App() {
  const { user, loading: authLoading, login, register, logout } = useAuth();
  const {
    doctors,
    appointments,
    prescriptions,
    loading: apiLoading,
    fetchDoctors,
    fetchAppointments,
    fetchPrescriptions,
    createAppointment,
  } = useApi();

  const [showRegister, setShowRegister] = useState(false);
  const [showBookAppointment, setShowBookAppointment] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [activeTab, setActiveTab] = useState('doctors');

  useEffect(() => {
    if (user) {
      fetchDoctors();
      fetchAppointments();
      fetchPrescriptions();
    }
  }, [user]);

  const handleLogin = async loginData => {
    const result = await login(loginData);
    if (!result.success) {
      alert(result.error);
    }
  };

  const handleRegister = async registerData => {
    const result = await register(registerData);
    if (result.success) {
      setShowRegister(false);
    } else {
      alert(result.error);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleBookAppointment = doctor => {
    setSelectedDoctor(doctor);
    setShowBookAppointment(true);
  };

  const handleAppointmentSubmit = async appointmentData => {
    const result = await createAppointment(appointmentData);
    if (result.success) {
      setShowBookAppointment(false);
      setSelectedDoctor(null);
      setActiveTab('appointments');
    } else {
      alert(result.error);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-md mx-auto mt-8 p-6">
          {showRegister ? (
            <Register onRegister={handleRegister} onSwitchToLogin={() => setShowRegister(false)} />
          ) : (
            <Login onLogin={handleLogin} onSwitchToRegister={() => setShowRegister(true)} />
          )}
        </div>
      </div>
    );
  }

  if (apiLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={handleLogout} />

      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {['doctors', 'appointments', 'prescriptions'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showBookAppointment && selectedDoctor ? (
          <BookAppointment
            doctor={selectedDoctor}
            onSubmit={handleAppointmentSubmit}
            onCancel={() => {
              setShowBookAppointment(false);
              setSelectedDoctor(null);
            }}
          />
        ) : (
          <div>
            {activeTab === 'doctors' && (
              <DoctorsList doctors={doctors} onBookAppointment={handleBookAppointment} />
            )}
            {activeTab === 'appointments' && <Appointments appointments={appointments} />}
            {activeTab === 'prescriptions' && <Prescriptions prescriptions={prescriptions} />}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
