import signup from "@application/use_cases/auth/signup";
import login from "@application/use_cases/auth/login";
import logger from "../../logger";

const cookieOptions = {
  maxAge: 24 * 60 * 60 * 1000, // 1day
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
        res.cookie("jwt", data.token, cookieOptions);
        res.status(201).json({
          status: "success",
          message: "Signup successful",
          data
        });
      })
      .catch((err) => {
        next(err);
      });
  };

  const loginUser = (req, res, next) => {
    const { email, password } = req.body;

    login({ email, password }, dbRepository, authService)
      .then((token) => {
        res.cookie("jwt", token, cookieOptions);
        res.status(200).json({
          status: "success",
          message: "Login succuessful",
          token
        });
      })
      .catch(next);
  };

  return {
    signupUser,
    loginUser
  };
}
