import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDB } from './config/db.js'
import productRoutes from './routes/productRoutes.js'

// Load environment variables based on NODE_ENV
if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.development' })
} else {
  dotenv.config()
}
connectDB()

const app = express()
app.use(cors())
app.use(express.json())
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}

app.get('/', (req, res) => {
  res.send('API is running')
})

app.use('/api/products', productRoutes)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Static images (for sample data)
app.use('/images', express.static(path.join(__dirname, 'images')))

const PORT = 5174
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
