import { Hono } from 'hono'
// import type { AppHono } from '@/types/hono.js'
import HttpStatusCodes from '@/constants/http-status-codes.js'
import { requestId } from 'hono/request-id'
import errorHandler from '@/utils/error-handler.js'
import { HTTPException } from 'hono/http-exception'
import { logger } from 'hono/logger'

export function createRouter() {
  return new Hono({
    strict: false
  })
}

export default function createApp() {
  const app = createRouter()

  app.use(requestId())

  app.use(logger())

  app.notFound(() => {
    throw new HTTPException(HttpStatusCodes.NOT_FOUND, {
      message: 'Route Not Found'
    })
  })

  app.onError(errorHandler)

  return app
}
