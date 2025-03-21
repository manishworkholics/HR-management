const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  leave_type: { type: String, required: true },
  from_date: { type: String, required: true },
  to_date: { type: String, required: true },
  reason: { type: String, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, default: 'pending' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', ApplicationSchema);
