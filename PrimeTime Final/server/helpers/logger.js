import * as winston from "winston";
const options = { timeZone: "Europe/Paris", timeZoneName: "short" };
const timezoned = () => {
  return new Date().toLocaleString("en-fr", options);
};

const myCustomLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  colors: {
    debug: "white",
    info: "cyan",
    silly: "white",
    warn: "yellow",
    http: "magenta",
    error: "red",
  },
};
const alignColorsAndTime = winston.format.combine(
  winston.format.colorize({
    all: true,
  }),
  winston.format.timestamp({
    format: "DD-MM-YY HH:MM:SS",
  }),
  winston.format.printf(
    (info) => `${info.timestamp}  ${info.level} : ${info.message}`
  )
);
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    //
    // - Write all logs with importance level of error or less to error.log
    // - Write all logs with importance level of info or less to combined.log
    //
    new winston.transports.File({
      level: "error",
      levels: myCustomLevels.levels,
      filename: "error.log",
      handleExceptions: true,
      // json: true,
      format: winston.format.combine(
        winston.format.timestamp({ format: timezoned }),
        winston.format.prettyPrint()
      ),
      maxsize: 5242880, //5MB
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: "combined.log",
      handleExceptions: true,
      // json: true,
      format: winston.format.combine(
        winston.format.timestamp({ format: timezoned }),
        winston.format.prettyPrint()
      ),
      maxsize: 5242880, //5MB
      maxFiles: 5,
    }),
  ],
});

logger.stream = {
  write: function (message, encoding) {
    logger.info(message);
  },
};

winston.addColors(myCustomLevels.colors);
//
// If we're not in production then log to the console with the format:
// ${info.level}: ${info.message} JSON.stringify({ ...rest })
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      level: "debug",
      handleExceptions: true,
      colorize: true,
      format: winston.format.combine(
        winston.format.colorize(),
        alignColorsAndTime
      ),
    })
  );
}
export default logger;
