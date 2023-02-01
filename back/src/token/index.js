const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { getToken } = require("../utils");
const userModel = require("../models/user");
const app = express();
app.use(express.json());

const verifyToken = (req, res, type) => {
  let authorization = "";

  if (type === "refresh") {
    authorization = getToken(
      res.locals.refreshToken,
      res.locals.refreshTokenKey
    );
  } else if (type === "access") {
    authorization = req.headers.authorization || "";
  }

  const jwtSecretKey = process.env.jWT_SECRET || "";

  if (!authorization) {
    return {
      isOk: false,
      json: {
        status: 401,
        message: "토큰이 없습니다",
      },
    };
  }
  try {
    const data = jwt.verify(
      authorization.replace(`${jwtSecretKey} `, ""),
      jwtSecretKey
    );

    res.locals.id = data.id;
    return {
      isOk: true,
    };
  } catch (error) {
    const typeToKor = type === "access" ? "엑세스" : "리프레시";

    if (error instanceof Error) {
      if (error.name === "TokenExpiredError") {
        return {
          isOk: false,
          json: {
            status: 419,
            message: `만료된 ${typeToKor} 토큰입니다.`,
            code: "expired",
            type,
          },
        };
      }
    }

    return {
      isOk: false,
      json: {
        status: 401,
        message: `유효하지 않은 ${typeToKor} 토큰입니다.`,
      },
    };
  }
};

module.exports.verifyToken = verifyToken;

module.exports.verifyAccessToken = (req, res, next) => {
  const response = verifyToken(req, res, "access");
  const { isOk } = response;

  if (isOk) {
    next();
  } else {
    const status = response.json.status || 401;
    const message = response.json.message;
    const code = response.json.code;
    const type = response.json.type;

    return res.status(status).json({
      message,
      ...(!!code && {
        code,
      }),
      ...(!!type && {
        type,
      }),
    });
  }
};

const deEncryptString = (str = "") => {
  const algorithm = "aes-256-cbc";
  const key = crypto.scryptSync("wolfootjaIsSpecial", "specialSalt", 32);
  const iv = "1234567890123456";

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let result = decipher.update(str, "base64", "utf8");
  result += decipher.final("utf8");

  return result;
};

module.exports.verifyRefreshToken = async (req, res, next) => {
  const refreshTokenKey = req.headers.refreshtokenkey || "";
  const [ignore, tokenKey] = refreshTokenKey.split(" ");

  const id = deEncryptString(tokenKey);

  try {
    const { refresh_token } = await userModel.findOne({ user_id: id });

    res.locals.refreshToken = refresh_token;
    res.locals.refreshTokenKey = tokenKey;
  } catch (err) {
    return res.status(500).json({ message: "fail", err });
  }

  const response = verifyToken(req, res, "refresh");
  const { isOk } = response;

  if (isOk) {
    next();
  } else {
    const status = response.json.status || 401;
    const message = response.json.message;
    const code = response.json.code;
    const type = response.json.type;

    return res.status(status).json({
      message,
      ...(!!code && {
        code,
      }),
      ...(!!type && {
        type,
      }),
    });
  }
};

module.exports.generatedJwtToken = ({ sub, id, expiresIn }) => {
  if (!["refresh", "access"].includes(sub)) {
    return;
  }

  const jwtSecretKey = process.env.jWT_SECRET || "";

  const token = jwt.sign({ sub, id }, jwtSecretKey, {
    expiresIn,
  });

  return token;
};
