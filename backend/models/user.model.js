const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: 'employee' },
  type: { type: String, default: 'employee' },
  enter_time: { type: String },
  exit_time: { type: String },
  profile_img: { type: String },
  start_date: { type: String },
  wages_per_day: { type: String },
  status: { type: String },
  active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
