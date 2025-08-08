/**
 * 创建一个图书资源的crud路由
 */

import { createUserSchema, updateUserSchema } from '@/schemas/book.js'
import { createRouter } from '@/lib/create-app.js'
import { createBook, deleteBook, getBookById, getBooks, updateBook } from '@/controllers/books.js'
import { zValidator } from '@/lib/validator-wrapper.js'

/**
 * 图书资源路由
 */
const bookRouter = createRouter()

// 获取所有图书
bookRouter.get('/', getBooks)

// 获取单个图书
bookRouter.get('/:id', getBookById)

// 创建图书 - 返回每个字段的第一个错误
bookRouter.post('/', zValidator('json', createUserSchema, { firstErrorPerField: true }), createBook)

// 更新图书 - 显示所有验证错误
bookRouter.put('/:id', zValidator('json', updateUserSchema), updateBook)

// 删除图书
bookRouter.delete('/:id', deleteBook)

export default bookRouter
