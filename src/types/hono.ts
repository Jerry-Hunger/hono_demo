import { Hono } from 'hono'
import type { PinoLogger } from 'hono-pino'

export type AppBindings = {
  Variables: {
    logger: PinoLogger
  }
}

export type AppHono = Hono<AppBindings>
