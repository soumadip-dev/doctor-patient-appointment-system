import { useState } from 'react';

export const BookAppointment = ({ doctor, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    date: '',
    reason: '',
  });

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({
      doctor: doctor._id,
      date: new Date(formData.date).toISOString(),
      reason: formData.reason,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Book Appointment with Dr. {doctor.name}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date and Time:</label>
            <input
              type="datetime-local"
              value={formData.date}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Appointment:
            </label>
            <textarea
              value={formData.reason}
              onChange={e => setFormData({ ...formData, reason: e.target.value })}
              required
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Please describe the reason for your appointment"
            />
          </div>
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
