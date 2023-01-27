const express = require('express');
const mongoose = require('mongoose');
const categoryModel = require('../../models/caregory');
const cors = require('cors');
const app = express();
const MONGODB_URI = process.env.MONGODB_URI;
app.use(cors());

mongoose.set('strictQuery', false);
mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI, { dbName: 'bucket', useNewUrlParser: true });

const formatCategoryList = (categoryList) => {
  return categoryList.map((categoryInfo) => {
    return {
      id: categoryInfo._id,
      name: categoryInfo.name,
      icon: categoryInfo.icon,
    };
  });
};

app.get('/', async (req, res) => {
  try {
    console.log(req.headers);
    const oldCategoryList = await categoryModel.find();
    const categoryList = formatCategoryList(oldCategoryList);

    res.status(200).json({ categoryList });
  } catch (err) {
    res.status(500).json({ message: '서버요청 실패' });
  }
});

module.exports = app;
