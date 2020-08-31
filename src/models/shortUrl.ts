import mongoose, { Schema, Document } from 'mongoose'
import shortId from 'shortid'

export interface shortURLInterface extends Document {
	full: string
	short?: string
	created?: string
}

const shortURLSchema: Schema = new mongoose.Schema({
	full: {
		type: String,
		required: true,
	},
	short: {
		type: String,
		required: true,
		default: shortId.generate,
	},
	created: {
		type: Number,
		required: true,
		default: Date.now(),
	},
})

export default mongoose.model<shortURLInterface>('ShortURL', shortURLSchema)
