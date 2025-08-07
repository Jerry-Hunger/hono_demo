import { Hono } from 'hono'
import { pinoLoggerMiddleware } from '@/middlewares/pino-logger.js'
import type { AppHono } from '@/types/hono.js'

export function createRouter(): AppHono {
  return new Hono({
    strict: false
  })
}

export default function createApp() {
  const app = createRouter()

  app.use(pinoLoggerMiddleware)

  app.notFound((c) => {
    return c.json({ message: 'Route Not Found' }, 404)
  })
  return app
}
