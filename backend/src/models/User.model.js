import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

//* Schema definition
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['doctor', 'patient'],
      default: 'user',
    },
    specialization: {
      type: String,
      // required only if the user is a doctor
      required: function () {
        return this.role === 'doctor';
      },
    },
  },
  {
    timestamps: true,
  }
);

//* Pre save hook to hash the password and convert email to lowercase
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  this.email = this.email.toLowerCase();
  next();
});

//* Method to compare password
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

//* Create the model
const User = mongoose.models.User || mongoose.model('User', userSchema);

//* Export the model
export default User;
