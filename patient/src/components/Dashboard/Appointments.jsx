export const Appointments = ({ appointments }) => (
  <div className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">My Appointments</h2>
    <div className="space-y-4">
      {appointments.map(appointment => (
        <div
          key={appointment._id}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Appointment with Dr. {appointment.doctor.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
            <p>
              <span className="font-medium">Date:</span>{' '}
              {new Date(appointment.date).toLocaleString()}
            </p>
            <p>
              <span className="font-medium">Reason:</span> {appointment.reason}
            </p>
            <p>
              <span className="font-medium">Status:</span>
              <span
                className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                  appointment.status === 'scheduled'
                    ? 'bg-blue-100 text-blue-800'
                    : appointment.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {appointment.status}
              </span>
            </p>
            <p>
              <span className="font-medium">Specialization:</span>{' '}
              {appointment.doctor.specialization}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
