const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String },
  user_entry_time: { type: String },
  user_exit_time: { type: String },
  status: { type: String, enum: ['Present', 'Absent'], required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
