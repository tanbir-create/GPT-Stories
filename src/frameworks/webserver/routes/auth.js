import authController from "@adapters/controllers/authController";
import userDbRepository from "@application/repositories/userRepository";
import userDbRepositoryMongoDB from "@frameworks/database/mongoDB/repositories/userRepositoryMongoDB";
import authServiceInterface from "@application/services/authService";
import authServiceImpl from "@frameworks/services/authService";
import validationServiceInterface from "@application/services/validationService";
import validationServiceImpl from "@frameworks/services/validationService";

export default function authRouter(express) {
  const router = express.Router();

  // const userReoposirty =
  const controller = authController(
    userDbRepository,
    userDbRepositoryMongoDB,
    authServiceInterface,
    authServiceImpl,
    validationServiceInterface,
    validationServiceImpl
  );

  router.route("/signup").post(controller.signupUser);
  router.route("/login").post(controller.loginUser);

  return router;
}
