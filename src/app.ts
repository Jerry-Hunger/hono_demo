import bookRouter from '@/routers/books.js'
import createApp from '@/lib/create-app.js'

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

export default app
