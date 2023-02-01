const express = require("express");
const mongoose = require("mongoose");
const crypto = require("crypto");
const userModel = require("../../models/user");
const { generatedJwtToken } = require("../../token");
const cors = require("cors");
const app = express();
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
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

const encryptString = (str = "") => {
  const algorithm = "aes-256-cbc";
  const key = crypto.scryptSync("wolfootjaIsSpecial", "specialSalt", 32);
  const iv = "1234567890123456";

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let result = cipher.update(str, "utf8", "base64");
  result += cipher.final("base64");

  return result;
};

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

    const refreshTokenKey = encryptString(id);
    const refreshToken = generatedJwtToken({
      id,
      sub: "refresh",
      expiresIn: "24h",
    });
    const accessToken = generatedJwtToken({
      id,
      sub: "access",
      expiresIn: "10s",
    });

    await userModel.updateOne(
      { user_id: id },
      { refresh_token: `${refreshTokenKey}~${refreshToken}` }
    );

    res.status(200).json({
      data: {
        accessToken,
        nickname: userInfo.nickname,
        refreshTokenKey,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "서버요청 실패" });
  }
});

module.exports = app;
