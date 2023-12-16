import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../../config/config";

export default function authService() {
  const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  };

  const compare = async (password, hashedPassword) => {
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);

    return passwordsMatch;
  };

  const verify = (token) => jwt.verify(token, config.jwtSecret);

  const generateToken = (payload) => {
    return jwt.sign(payload, config.jwtSecret, {
      expiresIn: "1d"
    });
  };

  return {
    encryptPassword,
    compare,
    verify,
    generateToken
  };
}
