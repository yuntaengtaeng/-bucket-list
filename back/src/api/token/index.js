const express = require("express");
const mongoose = require("mongoose");
const {
  verifyRefreshToken,
  generatedJwtToken,
  verifyToken,
} = require("../../token/index");
const userModel = require("../../models/user");
const cors = require("cors");
const app = express();
const MONGODB_URI = process.env.MONGODB_URI;

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

mongoose.set("strictQuery", false);
mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI, { dbName: "bucket", useNewUrlParser: true });

app.post("/refresh-token", verifyRefreshToken, async (req, res) => {
  const id = res.locals.id;
  try {
    const { user_id } = await userModel.findOne({ user_id: id });

    if (!user_id) {
      Promise.reject();
    }

    const accessToken = generatedJwtToken({
      id,
      sub: "access",
      expiresIn: "5m",
    });

    res.status(200).json({
      data: {
        accessToken,
      },
    });
  } catch (error) {
    return res.status(404).json({ message: "가입되지 않은 회원입니다." });
  }
});

module.exports = app;
