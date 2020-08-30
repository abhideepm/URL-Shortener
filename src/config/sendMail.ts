import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
dotenv.config()

const email = process.env.MAILER_EMAIL
const password = process.env.MAILER_PASSWORD

const sendMail = async (mailOptions: Mail.Options): Promise<void> => {
	const transporter: Mail = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: email,
			pass: password,
		},
	})

	try {
		await transporter.sendMail(mailOptions)
		console.log('Email sent')
	} catch (err) {
		console.log('Email not sent')
	}
}

export default sendMail
