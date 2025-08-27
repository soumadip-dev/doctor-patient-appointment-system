import { useState } from 'react';

export const PrescriptionForm = ({ appointment, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    symptoms: '',
    diagnosis: '',
    medicines: [{ name: '', dosage: '', duration: '' }],
    additionalNotes: '',
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMedicineInputChange = (index, e) => {
    const { name, value } = e.target;
    const medicines = [...formData.medicines];
    medicines[index][name] = value;
    setFormData(prev => ({ ...prev, medicines }));
  };

  const addMedicineField = () => {
    setFormData(prev => ({
      ...prev,
      medicines: [...prev.medicines, { name: '', dosage: '', duration: '' }],
    }));
  };

  const removeMedicineField = index => {
    const medicines = formData.medicines.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, medicines }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({
      ...formData,
      appointmentId: appointment._id,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Create Prescription for {appointment.patient.name}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Symptoms:</label>
            <textarea
              name="symptoms"
              value={formData.symptoms}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Diagnosis:</label>
            <input
              type="text"
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Medicines:</label>
            <div className="space-y-3">
              {formData.medicines.map((medicine, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-3 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2">
                    <input
                      type="text"
                      placeholder="Medicine name"
                      name="name"
                      value={medicine.name}
                      onChange={e => handleMedicineInputChange(index, e)}
                      required
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Dosage"
                      name="dosage"
                      value={medicine.dosage}
                      onChange={e => handleMedicineInputChange(index, e)}
                      required
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Duration"
                      name="duration"
                      value={medicine.duration}
                      onChange={e => handleMedicineInputChange(index, e)}
                      required
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeMedicineField(index)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Remove Medicine
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addMedicineField}
              className="mt-3 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors"
            >
              Add Medicine
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes:
            </label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              Save Prescription
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
