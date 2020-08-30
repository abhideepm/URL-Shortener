import mongoose, { Document, Schema } from 'mongoose'

export interface userInterface extends Document {
	email: string
	password?: string
	fullName: string
}

const userSchema: Schema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		default: null,
	},
	fullName: {
		type: String,
		required: true,
	},
})

export default mongoose.model<userInterface>('User', userSchema)
