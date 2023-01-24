const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      require: true,
    },
    nickname: {
      type: String,
      require: true,
    },
  },
  { versionKey: false }
);

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
