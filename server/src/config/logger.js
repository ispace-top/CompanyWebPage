const winston = require('winston');
const { format } = winston;

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(info => 
      `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`
    )
  ),
  transports: [
    new winston.transports.File({ 
      filename: 'src/logs/error.log', 
      level: 'error',
      maxsize: 1024 * 1024 * 5, // 5MB 分割
      maxFiles: 3 
    }),
    new winston.transports.File({ 
      filename: 'src/logs/combined.log',
      maxsize: 1024 * 1024 * 5,
      maxFiles: 3 
    }),
    new winston.transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    })
  ]
});

module.exports = logger;