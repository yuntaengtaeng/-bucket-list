const mongoose = require('mongoose');

const bucketlistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const bucketlistModel = mongoose.model('bucketlist', bucketlistSchema);

module.exports = bucketlistModel;
