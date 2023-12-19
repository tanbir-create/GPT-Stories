import express from "express";
import mongoose from "mongoose";
import http from "http";

import config from "@config/config";
import serverConfig from "@frameworks/webserver/server";
import expressConfig from "@frameworks/webserver/express";
import mongoDbConnection from "@frameworks/database/connection";
import configureRoutes from "@frameworks/webserver/routes";
import errorHandlingMiddleware from "@frameworks/webserver/middlewares/errorHandlingMiddleware";

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
});

const app = express();
const server = http.createServer(app);

expressConfig(app, express);

serverConfig(app, mongoose, server, config).startServer();

mongoDbConnection(mongoose, config, {
  autoIndex: false,
  connectTimeoutMS: 1000
}).connectToMongo();

configureRoutes(app, express);

app.use(errorHandlingMiddleware);

process.on("unhandledRejection", (err) => {
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

// module.exports = app;
