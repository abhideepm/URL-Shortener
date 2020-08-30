import mongoose, { Document, Schema } from 'mongoose'

export interface userInterface extends Document {
	email: string
	password?: string
	fullName: string
	active: boolean
	token: string
	tokenExpiration: number
}

const userSchema: Schema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		default: null,
	},
	fullName: {
		type: String,
		required: true,
	},
	active: {
		type: Boolean,
		default: false,
	},
	token: {
		type: String,
		default: null,
	},
	tokenExpiration: {
		type: Number,
		default: null,
	},
})

export default mongoose.model<userInterface>('User', userSchema)
