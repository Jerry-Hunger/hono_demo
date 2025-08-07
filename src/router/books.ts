/**
 * 创建一个图书资源的crud路由
 */

import { zValidator } from '@hono/zod-validator'
import { createUserSchema } from '@/schemas/book.js'
import { createRouter } from '@/lib/create-app.js'

interface Book {
  id: string
  title: string
  author: string
}

const books: Book[] = [
  { id: '1', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: '2', title: '1984', author: 'George Orwell' },
  { id: '3', title: 'To Kill a Mockingbird', author: 'Harper Lee' }
]

/**
 * 图书资源路由
 */
const bookRouter = createRouter()

// 获取所有图书
bookRouter.get('/', (c) => {
  return c.json(books)
})

// 获取单个图书
bookRouter.get('/:id', (c) => {
  const { id } = c.req.param()
  const book = books.find((book) => book.id === id)

  if (!book) {
    return c.json({ message: 'Book not found' }, 404)
  }

  return c.json(book)
})

// 创建图书
bookRouter.post('/', zValidator('json', createUserSchema), async (c) => {
  const book = await c.req.json()
  books.push(book)
  return c.json(book)
})

// 更新图书
bookRouter.put('/:id', async (c) => {
  const { id } = c.req.param()
  const book = await c.req.json()
  const index = books.findIndex((book) => book.id === id)

  if (index === -1) {
    return c.json({ message: 'Book not found' }, 404)
  }

  books[index] = book
  return c.json(book)
})

// 删除图书
bookRouter.delete('/:id', (c) => {
  const { id } = c.req.param()
  const index = books.findIndex((book) => book.id === id)

  if (index === -1) {
    return c.json({ message: 'Book not found' }, 404)
  }

  books.splice(index, 1)
  return c.json({ message: 'Book deleted' })
})

export default bookRouter
