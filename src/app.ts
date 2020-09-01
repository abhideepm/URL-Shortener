import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import express, { Application } from 'express'
import mongoose from 'mongoose'
import indexRouter from './routes/index'
import cors from 'cors'
import path from 'path'
dotenv.config()

const dbURL = <string>process.env.db_url

mongoose.connect(dbURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: true,
})

const app: Application = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json(), cors())
app.use('/api', indexRouter)

if (process.env.NODE_ENV === 'production') {
	// Serve any static files
	app.use(express.static(path.join(__dirname, 'client/build')))

	// Handle React routing, return all requests to React app
	app.get('*', function (req, res) {
		res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
	})
}

app.listen(PORT, () => console.log('Listening'))
