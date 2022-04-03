const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isConfirmed: { type: Boolean, required: true, default: 0 },
    confirmOTP: { type: String, required: false },
    otpTries: { type: Number, required: false, default: 0 },
    status: { type: Boolean, required: true, default: 1 },
  },
  { timestamps: true }
);

UserSchema.virtual('fullName').get(() => `${this.firstName} ${this.lastName}`);

module.exports = mongoose.model('User', UserSchema);
