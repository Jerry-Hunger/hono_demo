import bookRouter from '@/router/books.js'
import createApp from '@/lib/create-app.js'

const app = createApp()

app.route('/books', bookRouter)

export default app
