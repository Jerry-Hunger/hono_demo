import { pino } from 'pino'
import env from '@/config/env.js'

/**
 * Pino Logger 实例
 */
export const logger = pino({
  level: env.NODE_ENV === 'development' ? 'debug' : 'info',
  transport:
    env.NODE_ENV === 'development'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            ignore: 'pid,hostname'
          }
        }
      : undefined,
  base: {
    pid: false
  }
})

export default logger
