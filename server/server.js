import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())


mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.fmp4jpf.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    app.listen(process.env.PORT)
})
.then(() => {
    console.log("Connected")
})
.catch((err) => {
    console.log(err)
})