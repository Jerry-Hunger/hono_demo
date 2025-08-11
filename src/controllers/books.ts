import HttpStatusCodes from '@/constants/http-status-codes.js'
import type { createUserDto, updateUserDto } from '@/schemas/book.js'
import type { Handler } from 'hono'
import { HTTPException } from 'hono/http-exception'

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

// 用于生成自增id
let nextId = books.length > 0 ? Math.max(...books.map((b) => Number(b.id))) + 1 : 1

export const getBooks: Handler = (c) => {
  return c.json(books)
}

export const getBookById: Handler = (c) => {
  const { id } = c.req.param()
  const book = books.find((book) => book.id === id)

  if (!book) {
    throw new HTTPException(HttpStatusCodes.NOT_FOUND, {
      message: 'Book not found'
    })
  }

  return c.json(book)
}

export const createBook: Handler = async (c) => {
  const { title, author }: createUserDto = await c.req.json()
  const book: Book = {
    id: String(nextId++),
    title,
    author
  }
  books.push(book)
  return c.json(book)
}

export const updateBook: Handler = async (c) => {
  const { id } = c.req.param()
  const { title, author }: updateUserDto = await c.req.json()
  const index = books.findIndex((book) => book.id === id)

  if (index === -1) {
    throw new HTTPException(HttpStatusCodes.NOT_FOUND, {
      message: 'Book not found'
    })
  }

  books[index] = {
    ...books[index],
    title: title ?? books[index].title,
    author: author ?? books[index].author
  }
  return c.json(books[index])
}

export const deleteBook: Handler = async (c) => {
  const { id } = c.req.param()
  const index = books.findIndex((book) => book.id === id)

  if (index === -1) {
    throw new HTTPException(HttpStatusCodes.NOT_FOUND, {
      message: 'Book not found'
    })
  }

  books.splice(index, 1)
  return c.json({ message: 'Book deleted' })
}
