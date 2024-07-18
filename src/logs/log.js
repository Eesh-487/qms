// src/logger.js
const winston = require("winston");
const { combine, timestamp, json, errors } = winston.format;

const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp(),
    json(),
    errors({ stack: true })
  ),
  defaultMeta: {
    service: "entity-service"
  },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log', level: 'info' }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ]
});

module.exports = logger;
