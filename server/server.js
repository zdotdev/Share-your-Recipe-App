import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import router from '../routes/receipt-router.js'
import bodyParser from 'body-parser'

const app = express()
dotenv.config()

app.use(cors())
app.use(bodyParser.json({ limit : "100mb"}))
app.use(bodyParser.urlencoded({ extended : true, limit : "100mb"}))
app.use(express.json())

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

app.use("/dish", router)