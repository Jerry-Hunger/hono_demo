import env from '@/config/env.js'
import type { AppBindings } from '@/types/hono.js'
import type { ErrorHandler } from 'hono'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'
import { errorLogger } from '@/utils/logger.js'

export const errorHandler: ErrorHandler<AppBindings> = (err: Error, c) => {
    // 使用专用的 pino logger 记录错误信息
    const errorInfo = {
        error: err.message,
        stack: err.stack,
        requestId: c.get('requestId'),
        path: c.req.path,
        method: c.req.method,
        timestamp: new Date().toISOString()
    }

    // 记录错误信息（包含完整堆栈和请求上下文）[[memory:5743363]]
    errorLogger.error(errorInfo, `请求失败: ${err.name}`)

    // 默认响应结构
    let statusCode = 500
    const responseBody = {
        message: `请求失败：${err.name}`,
        errors: `${err.message}`
    }

    // 如果是 Hono 的 HTTPException，则用它的状态码
    if (err instanceof HTTPException) {
        statusCode = err.status
    }

    // 最终统一响应
    return c.json(responseBody, statusCode as ContentfulStatusCode)
}

export default errorHandler
