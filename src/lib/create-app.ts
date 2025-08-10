import { Hono } from 'hono'
import type { AppHono } from '@/types/hono.js'
import HttpStatusCodes from '@/constants/http-status-codes.js'
import { requestId } from 'hono/request-id'
import errorHandler from '@/utils/error-handler.js'
import { pinoLoggerMiddleware } from '@/middlewares/pino-logger.js'

export function createRouter(): AppHono {
  return new Hono({
    strict: false
  })
}

export default function createApp() {
  const app = createRouter()

  app.use(requestId())

  app.notFound((c) => {
    return c.json({ message: 'Route Not Found' }, HttpStatusCodes.NOT_FOUND)
  })

  app.onError(errorHandler)

  return app
}
