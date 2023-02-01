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
  const { newBucketlist, checked } = bucketlist.reduce(
    (res, cur) => {
      if (cur.is_checked) {
        res.checked += 1;
      }

      res.newBucketlist.push({
        id: cur._id,
        categoryID: cur.category_id,
        title: cur.title,
        context: cur.context,
        isChecked: cur.is_checked,
      });

      return res;
    },
    { newBucketlist: [], checked: 0 }
  );

  return {
    bucketlist: newBucketlist,
    count: {
      total: newBucketlist.length,
      notChecked: newBucketlist.length - checked,
      checked,
    },
  };
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

    res.status(200).json({ posted: true });
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
    const bucketlist = await bucketlistModel.find(searchOption);
    const result = formatBucketlist(bucketlist);

    res.status(200).json({ data: result });
  } catch (err) {
    res.status(500).json({ message: "서버요청 실패", test: err.message });
  }
});

const formatBucketlistDetail = (bucketlistInfo) => {
  return {
    id: bucketlistInfo._id,
    categoryID: bucketlistInfo.category_id,
    title: bucketlistInfo.title,
    context: bucketlistInfo.context,
    isChecked: bucketlistInfo.is_checked,
  };
};

app.get(
  "/bucklist/detail/:bucketlistID",
  verifyAccessToken,
  async (req, res) => {
    const bucketlistID = req.params.bucketlistID;
    const id = res.locals.id;

    try {
      const bucketlistInfo = await bucketlistModel.findOne({
        _id: bucketlistID,
        user_id: id,
      });
      const result = formatBucketlistDetail(bucketlistInfo);

      res.status(200).json({ bucklistInfo: result });
    } catch (err) {
      res.status(500).json({ message: "서버요청 실패", test: err.message });
    }
  }
);

app.delete(
  "/bucklist/deleted/:buckletistID",
  verifyAccessToken,
  async (req, res) => {
    const buckletistID = req.params.buckletistID;
    const id = res.locals.id;

    try {
      await bucketlistModel.deleteOne({
        _id: buckletistID,
        user_id: id,
      });

      const bucketlist = await bucketlistModel.find({ user_id: id });
      const result = formatBucketlist(bucketlist);

      res.status(200).json({ data: result });
    } catch (err) {
      res.status(500).json({ message: "서버요청 실패" });
    }
  }
);

app.patch(
  "/bucklist/patch/:buckletistID",
  verifyAccessToken,
  async (req, res) => {
    const buckletistID = req.params.buckletistID;
    const body = req.body;
    const id = res.locals.id;

    const patchOption = {
      ...(!!body.categoryID && {
        category_id: body.categoryID,
      }),
      ...(!!body.title && {
        title: body.title,
      }),
      ...(!!body.context && {
        context: body.context,
      }),
    };

    try {
      await bucketlistModel.updateOne(
        {
          _id: buckletistID,
          user_id: id,
        },
        patchOption
      );

      res.status(200).json({ patched: true });
    } catch (err) {
      res.status(500).json({ message: "서버요청 실패" });
    }
  }
);

app.patch(
  "/bucklist/checked/:buckletistID",
  verifyAccessToken,
  async (req, res) => {
    const buckletistID = req.params.buckletistID;
    const id = res.locals.id;

    try {
      const bucketlistInfo = await bucketlistModel.findOne({
        _id: buckletistID,
        user_id: id,
      });

      await bucketlistModel.updateOne(
        {
          _id: buckletistID,
          user_id: id,
        },
        {
          is_checked: !bucketlistInfo.is_checked,
        }
      );

      const bucketlist = await bucketlistModel.find({ user_id: id });
      const result = formatBucketlist(bucketlist);

      res.status(200).json({ data: result });
    } catch (err) {
      res.status(500).json({ message: "서버요청 실패" });
    }
  }
);

module.exports = app;
