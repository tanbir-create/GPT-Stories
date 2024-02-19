import signup from "@application/use_cases/auth/signup";
import login from "@application/use_cases/auth/login";
import logout from "@application/use_cases/auth/logout";
import generataRefreshToken from "@application/use_cases/auth/refreshToken";

const cookieOptions = {
  maxAge: 2 * 24 * 60 * 60 * 1000, // 2days
  httpOnly: true,
  secure: process.env.NODE_ENV === "production"
};

export default function authController(
  userDbRepository,
  userDbRepositoryImpl,
  authServiceInterface,
  authServiceImpl,
  validationServiceInterface,
  validationServiceImpl
) {
  const dbRepository = userDbRepository(userDbRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());
  const validationService = validationServiceInterface(validationServiceImpl());

  const signupUser = (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;

    signup(
      { username, email, password, confirmPassword },
      dbRepository,
      authService,
      validationService
    )
      .then((data) => {
        res.cookie("accessToken", data.accessToken, cookieOptions);
        res.cookie("refreshToken", data.refreshToken, cookieOptions);
        res.status(201).json({
          status: "success",
          message: "Signup successful",
          data
        });
      })
      .catch(next);
  };

  const loginUser = (req, res, next) => {
    const { email, password } = req.body;

    login({ email, password }, dbRepository, authService)
      .then((data) => {
        res.cookie("accessToken", data.accessToken, cookieOptions);
        res.cookie("refreshToken", data.refreshToken, cookieOptions);
        res.status(200).json({
          status: "success",
          message: "Login succuessful",
          data
        });
      })
      .catch(next);
  };

  const logoutUser = (req, res, next) => {
    const authUser = req.user;

    logout({ authUser }, dbRepository)
      .then(() => {
        res.clearCookie("accessToken", cookieOptions);
        res.clearCookie("refreshToken", cookieOptions);
        res.status(200).json({
          status: "success",
          message: "Logged out"
        });
      })
      .catch(next);
  };

  const refreshAccessToken = (req, res, next) => {
    const token = req.cookies?.refreshToken;

    generataRefreshToken({ token }, dbRepository, authService)
      .then((data) => {
        res.cookie("accessToken", data.accessToken, cookieOptions);
        res.cookie("refreshToken", data.refreshToken, cookieOptions);
        res.status(200).json({
          status: "success",
          message: "Access Token refreshed",
          data
        });
      })
      .catch(next);
  };

  return {
    signupUser,
    loginUser,
    logoutUser,
    refreshAccessToken
  };
}
