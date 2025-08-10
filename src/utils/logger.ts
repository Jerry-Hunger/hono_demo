import { pino } from 'pino'
import env from '@/config/env.js'

/**
 * 专用于错误处理的 Pino Logger 实例
 * 与中间件的 logger 分离，专门用于错误日志记录
 */
export const errorLogger = pino({
  name: 'error-handler',
  level: env.NODE_ENV === 'development' ? 'debug' : 'error',
  transport:
    env.NODE_ENV === 'development'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname'
          }
        }
      : {
          target: 'pino/file',
          options: {
            destination: './logs/error.log',
            mkdir: true
          }
        },
  base: {
    pid: false
  },
  timestamp: pino.stdTimeFunctions.isoTime
})

export default errorLogger
