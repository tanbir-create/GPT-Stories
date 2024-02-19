import postController from "@adapters/controllers/postController";
import postDbRepository from "@application/repositories/postRepository";
import postDbRepositoryMongoDB from "@frameworks/database/mongoDB/repositories/postRepositoryMongoDB";
import validationServiceInterface from "@application/services/validationService";
import validationServiceImpl from "@frameworks/services/validationService";
import postServiceInterface from "@application/services/postService";
import postServiceImpl from "@frameworks/services/postService";
import authMiddleware from "../middlewares/authMiddlware";

export default function authRouter(express) {
  const router = express.Router();

  // const userReoposirty =
  const controller = postController(
    postDbRepository,
    postDbRepositoryMongoDB,
    validationServiceInterface,
    validationServiceImpl,
    postServiceInterface,
    postServiceImpl
  );

  router.route("/").post(authMiddleware, controller.addNewPost);
  router.route("/")

  return router;
}
