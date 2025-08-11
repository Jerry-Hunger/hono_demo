// import type { AppBindings } from '@/types/hono.js'
import type { ErrorHandler } from 'hono'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'
import logger from '@/utils/logger.js'
import env from '@/config/env.js'
import HttpStatusCodes from '@/constants/http-status-codes.js'

interface ErrorResponse {
  message: string
  errors?: string | string[]
}

export const errorHandler: ErrorHandler = (err: Error, c) => {
  // 使用 pino logger 记录错误信息
  const errorInfo = {
    stack: err.stack,
    requestId: c.get('requestId')
  }

  // 记录错误信息（包含完整堆栈和请求上下文）
  if (env.NODE_ENV === 'development') {
    logger.error(errorInfo, err.message)
  }

  // 默认响应结构
  let statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR
  const responseBody: ErrorResponse = {
    message: `请求失败：${err.name}`,
    errors: `${err.message}`
  }

  // 如果是 Hono 的 HTTPException，则用它的状态码
  if (err instanceof HTTPException) {
    responseBody.message = '请求失败：HTTPError'
    statusCode = err.status as HttpStatusCodes
  }

  if (err.cause) {
    responseBody.errors = err.cause as string[]
  }

  // 最终统一响应
  return c.json(responseBody, statusCode as ContentfulStatusCode)
}

export default errorHandler
