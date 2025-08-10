import bookRouter from '@/routers/books.js'
import createApp from '@/lib/create-app.js'
import { HTTPException } from 'hono/http-exception'

const app = createApp()

const routes = [
  {
    path: '/books',
    router: bookRouter
  }
]

routes.forEach((route) => {
  app.route(route.path, route.router)
})

app.get('/', (c) => {
  throw new HTTPException(401, { message: '未授权访问' })
})

export default app
