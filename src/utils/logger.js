const winston = require('winston');

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    const date = new Date(timestamp);
    const formattedDate = date.toISOString().replace(/T/, ' ').replace(/\..+/, ''); // Formatea la fecha
    return `${formattedDate} [${level}]: ${message}`;
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        logFormat
    ),
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

module.exports = logger;