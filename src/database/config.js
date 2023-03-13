import mongoose from 'mongoose'

export const dbConnection = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(process.env.MONGODB_CNN)
    console.log('Connected to MongoDB successfully')
  } catch (error) {
    console.log(error)
    throw new Error('Error connecting to database')
  }
}
