const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const categoryModel = mongoose.model('category', categorySchema);

module.exports = categoryModel;
