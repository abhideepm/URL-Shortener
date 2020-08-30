import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import express, { Application } from 'express'
import mongoose from 'mongoose'
import indexRouter from './routes/index'
import cors from 'cors'
dotenv.config()

const dbURL = <string>process.env.db_url

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })

const app: Application = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json(), cors())
app.use('/api', indexRouter)

app.listen(PORT, () => console.log('Listening'))
