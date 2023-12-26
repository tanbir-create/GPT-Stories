import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
const { promisify } = require("util");

import config from "../../config/config";

export default function authService() {
  const encrypt = async (payload) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPayload = await bcrypt.hash(payload, salt);

    return hashedPayload;
  };

  const encryptToken = (token) => {
    const hash = crypto.createHash("sha256");
    hash.update(token);
    return hash.digest("hex");
  };

  const compareToken = async (token, encryptedToken) => {
    return encryptToken(token) === encryptedToken;
  };

  const compare = async (payload, hashedPayload) => {
    const payloadsMatch = await bcrypt.compare(payload, hashedPayload);

    return payloadsMatch;
  };

  const verify = async (token, type) => {
    const secret =
      type === "access" ? config.jwtAccessSecret : config.jwtRefreshSecret;

    return await promisify(jwt.verify)(token, secret);
  };

  const generateToken = (payload, type) => {
    const secret =
      type === "access" ? config.jwtAccessSecret : config.jwtRefreshSecret;

    const expiresIn =
      type === "access"
        ? config.jwtAccessTokenExpiresIn
        : config.jwtRefreshTokenExpiresIn;

    return jwt.sign(payload, secret, {
      expiresIn
    });
  };

  const generateAccessAndRefreshTokens = async ({
    id,
    payload,
    userRepository,
    user
  }) => {
    const accessToken = generateToken(payload, "access");
    const refreshToken = generateToken(payload, "refresh");

    const encryptedRefreshToken = await encryptToken(refreshToken);
    const updatedUser = user({ refreshToken: encryptedRefreshToken });

    await userRepository.updateById(id, updatedUser);

    return {
      accessToken,
      refreshToken
    };
  };

  return {
    encrypt,
    compare,
    encryptToken,
    compareToken,
    verify,
    generateToken,
    generateAccessAndRefreshTokens
  };
}
