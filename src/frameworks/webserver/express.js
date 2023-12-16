import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import logger from "../../logger";

export default function expressConfig(app, express) {
  app.use(helmet());

  app.use(compression());
  app.use(express.json({ limit: "50mb" }));

  app.use(express.urlencoded({ extended: true }));

  app.use((req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );

    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With, Content-type, Authorization, Cache-control"
    );

    next();
  });

  app.use(
    morgan(
      function (tokens, req, res) {
        return JSON.stringify({
          method: tokens.method(req, res),
          url: tokens.url(req, res),
          status: Number.parseFloat(tokens.status(req, res)),
          content_length: tokens.res(req, res, "content-length"),
          response_time: Number.parseFloat(tokens["response-time"](req, res)),
          user_agent: tokens["user-agent"](req, res)
        });
      },
      {
        stream: {
          write: (message) => {
            // const data = JSON.parse(message);
            // logger.info("Incoming request", data);
          }
        }
      }
    )
  );
}
// logger.error("s", new Error("ere"));
