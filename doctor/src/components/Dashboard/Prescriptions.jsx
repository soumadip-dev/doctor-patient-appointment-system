export const Prescriptions = ({ prescriptions }) => (
  <div className="bg-white shadow-md rounded-lg p-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Prescriptions</h2>
    <div className="space-y-6">
      {prescriptions.map(prescription => (
        <div
          key={prescription._id}
          className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Prescription for {prescription.appointment.patient.name}
          </h3>
          <p className="text-gray-600 mb-2">
            <span className="font-medium">Date:</span>{' '}
            {new Date(prescription.createdAt).toLocaleString()}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-medium">Symptoms:</span> {prescription.symptoms}
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-medium">Diagnosis:</span> {prescription.diagnosis}
          </p>

          <div className="mb-4">
            <h4 className="font-medium text-gray-700 mb-2">Medicines:</h4>
            <ul className="space-y-2">
              {prescription.medicines.map((medicine, index) => (
                <li key={index} className="bg-gray-50 px-3 py-2 rounded-md">
                  <span className="font-medium">{medicine.name}</span> - {medicine.dosage} -{' '}
                  {medicine.duration}
                </li>
              ))}
            </ul>
          </div>

          {prescription.additionalNotes && (
            <p className="text-gray-600">
              <span className="font-medium">Notes:</span> {prescription.additionalNotes}
            </p>
          )}
        </div>
      ))}
    </div>
  </div>
);
