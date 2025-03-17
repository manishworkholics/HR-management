const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, default: 'pending' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', ApplicationSchema);
