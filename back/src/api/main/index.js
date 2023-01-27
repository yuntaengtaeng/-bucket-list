const express = require("express");
const { verifyAccessToken } = require("../../token");
const { checkRequiredProperties } = require("../../utils");
const mongoose = require("mongoose");
const bucketlistModel = require("../../models/bucklist");
const cors = require("cors");
const app = express();
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

mongoose.set("strictQuery", false);
mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI, { dbName: "bucket", useNewUrlParser: true });

const formatBucketlist = (bucketlist) => {
  return bucketlist.map((cur) => {
    return {
      id: cur._id,
      categoryID: cur.category_id,
      title: cur.title,
      context: cur.context,
    };
  });
};

app.post("/bucklist", verifyAccessToken, async (req, res) => {
  const body = req.body;

  if (!checkRequiredProperties(["categoryID", "title", "context"], body)) {
    return res.status(400).json({ message: "잘못된 파라미터 요청입니다." });
  }

  const id = res.locals.id;
  const createBucklist = new bucketlistModel({
    user_id: id,
    category_id: body.categoryID,
    title: body.title,
    context: body.context,
  });

  try {
    await createBucklist.save();

    const oldBucketlist = await bucketlistModel.find({ user_id: id });
    const bucketlist = formatBucketlist(oldBucketlist);

    res.status(200).json({ bucketlist });
  } catch (err) {
    res.status(500).json({ message: "서버요청 실패" });
  }
});

app.get("/bucklist/:categoryID", verifyAccessToken, async (req, res) => {
  const categoryID = req.params.categoryID;
  const id = res.locals.id;

  const searchOption = {
    user_id: id,
    ...(categoryID !== "63cf77bd83a110fec00e6034" && {
      category_id: categoryID,
    }),
  };

  try {
    const oldBucketlist = await bucketlistModel.find(searchOption);
    const bucketlist = formatBucketlist(oldBucketlist);

    res.status(200).json({ bucketlist });
  } catch (err) {
    res.status(500).json({ message: "서버요청 실패" });
  }
});

module.exports = app;
