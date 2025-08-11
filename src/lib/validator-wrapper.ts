import type { ZodSchema } from 'zod'
import type { ValidationTargets } from 'hono'
import { zValidator as zv } from '@hono/zod-validator'
import HttpStatusCodes from '@/constants/http-status-codes.js'
import { HTTPException } from 'hono/http-exception'

interface ValidatorOptions {
  stopOnFirstError?: boolean
  firstErrorPerField?: boolean
}

export function zValidator<T extends ZodSchema, Target extends keyof ValidationTargets>(
  target: Target,
  schema: T,
  options: ValidatorOptions = {}
) {
  return zv(target, schema, (result) => {
    if (!result.success) {
      // 格式化zod的错误信息，返回结构化的错误数组
      let formattedErrors = result.error.issues.map((error) => ({
        field: error.path.join('.'),
        message: error.message
      }))

      // 如果配置了在第一个错误后停止，只返回第一个错误
      if (options.stopOnFirstError && formattedErrors.length > 0) {
        formattedErrors = [formattedErrors[0]]
      }

      // 如果配置了每个字段的第一个错误，去重每个字段的错误
      if (options.firstErrorPerField) {
        const fieldMap = new Map()
        formattedErrors.forEach((error) => {
          if (!fieldMap.has(error.field)) {
            fieldMap.set(error.field, error)
          }
        })
        formattedErrors = Array.from(fieldMap.values())
      }

      throw new HTTPException(HttpStatusCodes.BAD_REQUEST, {
        message: 'Validation failed',
        cause: formattedErrors
      })
    }
  })
}
