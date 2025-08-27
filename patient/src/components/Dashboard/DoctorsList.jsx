export const DoctorsList = ({ doctors, onBookAppointment }) => (
  <div className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Doctors</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map(doctor => (
        <div
          key={doctor._id}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Dr. {doctor.name}</h3>
          <p className="text-gray-600 mb-2">
            <span className="font-medium">Specialization:</span> {doctor.specialization}
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-medium">Email:</span> {doctor.email}
          </p>
          <button
            onClick={() => onBookAppointment(doctor)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Book Appointment
          </button>
        </div>
      ))}
    </div>
  </div>
);
