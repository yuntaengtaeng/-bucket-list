const mongoose = require('mongoose');

const bucketlistSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    category_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    context: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const bucketlistModel = mongoose.model('bucketlist', bucketlistSchema);

module.exports = bucketlistModel;
