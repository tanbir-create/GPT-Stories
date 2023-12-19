import winston, { format } from "winston";

const customLevels = {
  levels: {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0
  },
  colors: {
    trace: "white",
    debug: "green",
    info: "green",
    warn: "yellow",
    error: "red",
    fatal: "red"
  }
};

const errorFilter = format((info, opts) => {
  return info.level === "error" ? info : false;
});

const infoFilter = format((info, opts) => {
  return info.level === "info" ? info : false;
});

const formatter = format.combine(
  format.json(),
  format.timestamp({
    format: "DD-MM-YYYY hh:mm:ss.SSS A"
  }),
  format.splat(),
  format.align(),
  format.printf((info) => {
    const { timestamp, level, message, ...meta } = info;
    const logEntry = {
      timestamp,
      level,
      message,
      meta: Object.keys(meta).length > 0 ? meta : null
    };

    return JSON.stringify(logEntry, null, 2);
  })
);

const prodTransport = new winston.transports.File({
  filename: "logs/error.log",
  level: "error",
  format: format.combine(
    format.errors({ stack: true }),
    errorFilter(),
    formatter
  )
});
const httpTransport = new winston.transports.File({
  filename: "logs/combined.log",
  level: "info",
  format: format.combine(infoFilter(), formatter)
});

const transport = new winston.transports.Console({
  format: formatter
});

let logger;

if (isDevEnvironment()) {
  logger = winston.createLogger({
    level: "trace",
    levels: customLevels.levels,
    // exitOnError: false,
    transports: [transport]
  });
} else {
  logger = winston.createLogger({
    level: "info",
    levels: customLevels.levels,
    transports: [httpTransport, prodTransport],
    exceptionHandlers: [
      new winston.transports.File({ filename: "logs/exceptions.log" })
    ],
    rejectionHandlers: [
      new winston.transports.File({ filename: "logs/rejections.log" })
    ]
  });
}

function isDevEnvironment() {
  return process.env.NODE_ENV === "development";
}

export default logger;
