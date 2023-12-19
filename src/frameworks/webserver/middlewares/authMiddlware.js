import authServiceInterface from "@application/services/authService";
import authServiceImpl from "../../services/authService";
import { AppError } from "@utils/error";

export default async function authMiddleware(req, res, next) {
  const authService = authServiceInterface(authServiceImpl());

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }

  if (!token) {
    return next(
      new AppError(
        "You are not logged in! Please log in to get access",
        401,
        "auth_token_error"
      )
    );
  }

  try {
    const decoded = await authService.verify(token, "access");
    req.user = decoded.user;
    next();
  } catch (error) {
    next(error);
  }
}
