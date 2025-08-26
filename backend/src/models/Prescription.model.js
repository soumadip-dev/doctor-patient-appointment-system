import mongoose from 'mongoose';

//* Medicine sub-schema
const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
});

//* Prescription schema
const prescriptionSchema = new mongoose.Schema(
  {
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
      required: true,
    },
    symptoms: {
      type: String,
      required: true,
    },
    diagnosis: {
      type: String,
      required: true,
    },
    medicines: {
      type: [medicineSchema],
      default: [],
    },
    additionalNotes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// Create and export the model
const Prescription =
  mongoose.models.Prescription || mongoose.model('Prescription', prescriptionSchema);

export default Prescription;
