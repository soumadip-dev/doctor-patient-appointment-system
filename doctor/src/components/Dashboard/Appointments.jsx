export const Appointments = ({ appointments, onUpdateStatus }) => (
  <div className="bg-white shadow-md rounded-lg p-6 mb-8">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Appointments</h2>
    <div className="space-y-4">
      {appointments.map(appointment => (
        <div
          key={appointment._id}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Appointment with {appointment.patient.name}
          </h3>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">Date:</span> {new Date(appointment.date).toLocaleString()}
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">Reason:</span> {appointment.reason}
          </p>
          <p className="text-gray-600 mb-3">
            <span className="font-medium">Status:</span>
            <span
              className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                appointment.status === 'scheduled'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {appointment.status}
            </span>
          </p>
          {appointment.status === 'scheduled' && (
            <button
              onClick={() => onUpdateStatus(appointment._id, 'completed')}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Mark as Completed
            </button>
          )}
        </div>
      ))}
    </div>
  </div>
);
