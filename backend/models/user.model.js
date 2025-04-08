const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  user_id: {
    type: String, unique: true, required: true,
    default: function () {
      return new mongoose.Types.ObjectId().toHexString();
    }
  },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  device_id: { type: String },
  role: { type: String, default: 'employee' },
  type: { type: String, default: 'employee' },
  enter_time: { type: String },
  exit_time: { type: String },
  profile_img: { type: String },
  start_date: { type: String },
  wages_per_day: { type: String },
  status: { type: String },
  gender: { type: String },
  adress: { type: String },
  mobile: { type: String },
  mail_id: { type: String },
  active: { type: Boolean, default: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
