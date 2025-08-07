import { pinoLogger } from 'hono-pino'
import env from '@/config/env.js'
/**
 * 日志中间件
 */
export const pinoLoggerMiddleware = pinoLogger({
  pino: {
    level: env.NODE_ENV === 'development' ? 'debug' : 'info',
    transport: {
      target: env.NODE_ENV === 'development' ? 'pino-pretty' : 'pino/file'
    }
  },
  http: {
    reqId: () => crypto.randomUUID()
  }
})
