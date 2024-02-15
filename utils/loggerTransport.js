const winston = require('winston')
const { createLogger, format, transports } = winston
const DailyRotateFile = require('winston-daily-rotate-file')
const Transport = require('winston-transport')
const util = require('util')
const { models } = require('../models')
const { loggerOptions } = require('./updateLogger')

// const postgresOptions = {
//   level: 'info'
//   // name: 'Postgres',
// }

// Create a custom transport to store logs in database
class RequestLogTransport extends Transport {
  constructor(options = {}) {
    super()
    const { label = '', level = 'info' } = options

    Object.assign(this, {
      level
    })
  }

  log(info, callback) {
    const handleCallback = (callback, ...args) => {
      if (callback && typeof callback === 'function') {
        callback(...args)
      }
    }

    setImmediate(() => {
      this.emit('logged', info)
    })

    const { level, message, ...meta } = info

    const log = {
      userId: loggerOptions.additionalData.injectedUserId,
      ipAddress: loggerOptions.additionalData.injectedIpAddress,
      level: level || null,
      message: message || null,
      authorization: typeof meta.meta.req.headers['authorization'] === 'string',
      cookie: meta.meta.req.headers.cookie || null,
      host: meta.meta.req.headers['host'] || null,
      origin: meta.meta.req.headers['origin'] || null,
      referer: meta.meta.req.headers['referer'] || null,
      userAgentInfo: meta.meta.req.headers['sec-ch-ua'] || null,
      isMobile: meta.meta.req.headers['sec-ch-ua-mobile'] === '?1',
      platform: meta.meta.req.headers['sec-ch-ua-platform'] || null,
      destination: meta.meta.req.headers['sec-fetch-dest'] || null,
      mode: meta.meta.req.headers['sec-fetch-mode'] || null,
      site: meta.meta.req.headers['sec-fetch-site'] || null,
      hasUserContext: meta.meta.req.headers['sec-fetch-user'] === '?1',
      upgradeInsecureRequests: meta.meta.req.headers['upgrade-insecure-requests'] || null,
      userAgent: meta.meta.req.headers['user-agent'] || null,
      httpVersion: meta.meta.req.httpVersion || null,
      method: meta.meta.req.method || null,
      originalUrl: meta.meta.req.originalUrl || null,
      query: JSON.stringify(meta.meta.req.query) || null,
      url: meta.meta.req.url || null,
      responseStatusCode: meta.meta.res.statusCode || null,
      responseTime: meta.meta.responseTime || null
    }

    // Save log to the database
    const logQuery = async () => {
      await models.Log.create(log)
    }

    logQuery(error => {
      if (error) {
        return handleCallback(callback, error)
      }

      return handleCallback(callback, null, true)
    })

    // Make sure to call the callback to signal that the log has been processed
    // callback()
  }
}

// Configure Winston logger with the custom transport
const customLogger = createLogger({
  format: format.combine(
    format.json(),
    format.timestamp()
    // format.metadata()
    // format.prettyPrint()
  ),
  transports: [
    // Console transport for immediate logging
    // new transports.Console(),
    // Attach the custom transport to the winston logger
    // new RequestLogTransport(postgresOptions),
    new RequestLogTransport({
      ...loggerOptions.postgresOptions,
      additionalData: loggerOptions.additionalData
    })
    // new transports.File({
    //   level: 'info',
    //   filename: 'logs/logsInfo.log'
    // }),
    // new transports.File({
    //   level: 'warn',
    //   filename: 'logs/logsWarnings.log'
    // }),
    // new transports.File({
    //   level: 'error',
    //   filename: 'logs/logsError.log'
    // })
    // DailyRotateFile transport for daily log rotation (in human-readable format)
    // new DailyRotateFile({
    //   level: 'info',
    //   filename: 'logs/application-%DATE%.json',
    //   datePattern: 'YYYY-MM-DD',
    //   zippedArchive: true,
    //   maxSize: '20m', // Maximum log file size before rotation (adjust as needed)
    //   maxFiles: '14d', // Retain logs for 14 days
    //   format: format.combine(format.json(), format.timestamp()) // JSON format for log entries in the rotated file
    // })
  ]
})

module.exports = {
  customLogger
}
