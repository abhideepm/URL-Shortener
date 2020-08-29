import bodyParser from 'body-parser'
import express, { Application } from 'express'
import indexRouter from './routes/index'

const app: Application = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use('/api', indexRouter)

app.listen(PORT, () => console.log('Listening'))
