import
    winston,
    {
        createLogger,
        format,
        transports,
    }
from "winston";

const logger = createLogger({
    level: 'info',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.errors({ stack: true }),
      format.splat(),
      format.json()
    ),
    defaultMeta: { service: 'coderhouse-backend-server-lucas-helguera' },
    transports: [
      //
      // - Write to all logs with level `warn` and below to `warn.log`.
      // - Write all logs error (and below) to `error.log`.
      // - Write all logs with level `info` and below to `combined.log`.
      //
      new transports.File({ filename: './logs/warn.log', level: 'warn' }),
      new transports.File({ filename: './logs/error.log', level: 'error' }),
      new transports.File({ filename: './logs/combined.log' })
    ]
});

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple()
        )
    }));
  }
  
/**
 * Runs a series of logs for testing.
 * 
 * Executes one log method of the logger for each log level, each method logs a simple String Literals.
 * 
 * @param {winston.logger} logger The logger object created with winston library.
 */
function testLogger(logger){
  logger.log('silly',   "Winston test log - log silly")
  logger.log('debug',   "Winston test log - log debug")
  logger.log('verbose', "Winston test log - log verbose")
  logger.log('info',    "Winston test log - log info")
  logger.log('warn',    "Winston test log - log warn")
  logger.log('error',   "Winston test log - log error")
}





export default logger;
export {
  testLogger,
}
