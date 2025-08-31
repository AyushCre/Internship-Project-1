import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { connectDB } from './config/db.js'
import { Product } from './models/productModel.js'
import { sampleProducts } from './data/products.js'

dotenv.config()

const importData = async () => {
  try {
    await connectDB()
    await Product.deleteMany()
    await Product.insertMany(sampleProducts)
    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await connectDB()
    await Product.deleteMany()
    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
