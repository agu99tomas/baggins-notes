const mongoose = require('mongoose');

const { Schema } = mongoose;

const options = { timestamps: true };

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isConfirmed: { type: Boolean, required: true, default: 0 },
    confirmOTP: { type: String, required: false },
    otpTries: { type: Number, required: false, default: 0 },
    active: { type: Boolean, required: true, default: 1 },
    notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
  },
  options,
);

module.exports = mongoose.model('User', UserSchema);
