import logger from "../../../logger";
import { AppError } from "@utils/error";

const handleCastErrorDB = (err) => {
  console.log(err);
  const message = `Invalid ${err.path}: ${err.value}`;
  const errors = [{ [err.path]: err.value }];
  const statusCode = 400;
  return new AppError(message, statusCode, "invalid_data_error", {
    errors
  });
};

const handleDuplicateFieldsDB = (err) => {
  const key = Object.keys(err.keyValue)[0];
  // const value = err.keyValue[key];
  const message = `${key} already in use. Please use another value`;
  const errors = [{ [key]: `${key} already in use.` }];
  return new AppError(message, 400, `form_validation_error`, { errors });
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => {
    return { [el.path]: el.message };
  });

  return new AppError("Please enter valid data", 400, "form_validation_error", {
    errors
  });
};

const handleJWTError = () => {
  return new AppError(
    "Invalid login attempt. Please login again",
    401,
    "auth_token_error"
  );
};

const handleJWTExpiredError = () => {
  return new AppError(
    "You are logged out! Please login again",
    401,
    "auth_token_error"
  );
};

function sendErrorDev(err, req, res) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack
  });
}

function sendErrorProd(err, req, res) {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      type: err.type,
      details: err.details
    });
  }

  console.log(err);

  res.status(500).json({
    status: 500,
    message: "Internal server error"
  });
}

export default function globalErrrorHandler(err, req, res, next) {
  logger.error(err.name, err);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    error.message = err.message;
    error.name = err.name;

    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
}
