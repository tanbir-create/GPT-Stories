import authRouter from "./auth";
import postRouter from "./post";

import { AppError } from "@utils/error";

export default function configureRoutes(app, express) {
  app.use("/api/v1/auth", authRouter(express));
  app.use("/api/v1/post", postRouter(express));

  app.all("*", (req, res, next) => {
    next(
      new AppError(
        `Can't find ${req.originalUrl} on this server!`,
        404,
        "not_found_error"
      )
    );
  });
}
