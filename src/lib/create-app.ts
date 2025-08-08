import { Hono } from 'hono'
import { pinoLoggerMiddleware } from '@/middlewares/pino-logger.js'
import type { AppHono } from '@/types/hono.js'
import HttpStatusCodes from '@/constants/http-status-codes.js'

export function createRouter(): AppHono {
  return new Hono({
    strict: false
  })
}

export default function createApp() {
  const app = createRouter()

  app.use(pinoLoggerMiddleware)

  app.notFound((c) => {
    return c.json({ message: 'Route Not Found' }, HttpStatusCodes.NOT_FOUND)
  })
  return app
}
