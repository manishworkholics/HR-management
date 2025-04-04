const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  recordTime: { type: Date, required: true },
  ip: { type: String }
});

const attendanceSchemasss = new mongoose.Schema({
  userSn: { type: Number, required: true },          // Serial number from the device
  deviceUserId: { type: Number, required: true },     // User ID on the machine
  date: { type: String, required: true },             // Format: YYYY-MM-DD
  logs: [logSchema]                                   // Array of punch logs for that day
}, {
  timestamps: true                                     // Adds createdAt and updatedAt
});

attendanceSchemasss.index({ userSn: 1, date: 1 }, { unique: true }); // Prevent duplicates


const attendanceSchema = new mongoose.Schema({
  userSn: Number,
  deviceUserId: Number,
  date: String, // Format: YYYY-MM-DD
  logs: [
    {
      recordTime: Date,
      ip: String
    }
  ]
});

module.exports = mongoose.model('Attend', attendanceSchema);
