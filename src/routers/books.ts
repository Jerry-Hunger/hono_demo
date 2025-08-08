/**
 * 创建一个图书资源的crud路由
 */

import { zValidator } from '@hono/zod-validator'
import { createUserSchema, updateUserSchema } from '@/schemas/book.js'
import { createRouter } from '@/lib/create-app.js'
import { createBook, deleteBook, getBookById, getBooks, updateBook } from '@/controllers/books.js'

/**
 * 图书资源路由
 */
const bookRouter = createRouter()

// 获取所有图书
bookRouter.get('/', getBooks)

// 获取单个图书
bookRouter.get('/:id', getBookById)

// 创建图书
bookRouter.post('/', zValidator('json', createUserSchema), createBook)

// 更新图书
bookRouter.put('/:id', zValidator('json', updateUserSchema), updateBook)

// 删除图书
bookRouter.delete('/:id', deleteBook)

export default bookRouter
