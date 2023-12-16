import { createTerminus } from "@godaddy/terminus";

export default function serverConfig(app, mongoose, serverInit, config) {
  function healthCheck() {
    if (
      mongoose.connection.readyState === 0 ||
      mongoose.connection.readyState === 3
    ) {
      return Promise.reject(new Error("Mongoose has disconnected"));
    }

    if (mongoose.connection.readyState === 2) {
      return Promise.reject(new Error("Mongoose is connecting"));
    }

    return Promise.resolve();
  }

  function onSignal() {
    console.log("Server is staring cleanup");
    return new Promise((resolve, reject) => {
      mongoose
        .disconnect(false)
        .then(() => {
          console.info("Mongoose has disconnected");
          resolve();
        })
        .catch(reject);
    });
  }

  function beforeShutdown() {
    return new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });
  }

  function onShutdown() {
    console.log("Cleanup finished, server is shutting down");
  }

  function startServer() {
    createTerminus(serverInit, {
      logger: console.log,
      signal: "SIGINT",
      healthChecks: {
        "/healthcheck": healthCheck
      },
      onSignal,
      onShutdown,
      beforeShutdown
    }).listen(config.port, () => {
      console.log(
        `Server listening on PORT: ${config.port} in ${app.get("env")} mode`
      );
    });
  }

  return {
    startServer
  };
}
