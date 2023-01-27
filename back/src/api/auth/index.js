const express = require("express");
const mongoose = require("mongoose");
const userModel = require("../../models/user");
const { generatedJwtToken } = require("../../token");
const cors = require("cors");
const app = express();
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

mongoose.set("strictQuery", false);
mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI, { dbName: "bucket", useNewUrlParser: true });

app.post("/join", async (req, res) => {
  const { id, password, nickname } = req.body;

  if (!id || !password || !nickname) {
    return res.status(400).json({ message: "잘못된 요청입니다." });
  }

  const postUser = new userModel({
    password,
    nickname,
    user_id: id,
  });

  try {
    const user = await userModel.findOne({ user_id: id });

    if (!!user) {
      return res.status(400).json({ message: "이미 가입되어있는 회원입니다." });
    }

    await postUser.save();

    res.status(200).json({ join: true });
  } catch (err) {
    res.status(500).json({ message: "서버요청 실패" });
  }
});

app.post("/login", async (req, res) => {
  const { id, password } = req.body;

  try {
    const userInfo = await userModel.findOne({ user_id: id });

    if (!userInfo) {
      return res.status(400).json({ message: "일치하는 아이디가 없습니다." });
    }

    if (userInfo.password !== password) {
      return res.status(400).json({ message: "비빌먼호가 일치하지 않습니다" });
    }

    console.log(req.headers.host);

    const refreshToken = generatedJwtToken({
      id,
      sub: "refresh",
      expiresIn: "24h",
    });
    const accessToken = generatedJwtToken({
      id,
      sub: "access",
      expiresIn: "5m",
    });

    res.cookie("refresh", refreshToken, {
      maxAge: 60 * 60 * 24 * 1000,
      httpOnly: true,
      sameSite: "none",
    });

    res
      .status(200)
      .json({ data: { accessToken, nickname: userInfo.nickname } });
  } catch (err) {
    res.status(500).json({ message: "서버요청 실패" });
  }
});

module.exports = app;
