const mongoose = require('mongoose');

const SalarySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  slip_url: { type: String },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Salary', SalarySchema);
