import bcrypt from 'bcrypt'
import { Request, Response, Router } from 'express'
import sendMail from '../config/sendMail'
import forgotPasswordEmail from '../templates/forgotPassword'
import resetPasswordConfirmation from '../templates/resetPassword'
import user from '../models/user'
import crypto from 'crypto'
import Mail from 'nodemailer/lib/mailer'

const router: Router = Router()

router.post('/forgotpassword', async (req: Request, res: Response) => {
	try {
		const { email } = req.body
		const userStatus = await user.findOne({ email: email })
		if (!userStatus) return res.json({ message: 'User not found' })

		//Create a token
		const token: string = crypto.randomBytes(16).toString('hex')

		await user.updateOne(
			{ email: req.body.email },
			{
				token: token,
				tokenExpiration: Date.now() + 15 * 60 * 1000,
			}
		)
		const url: string = `https://crm-react-node.netlify.app/resetpassword/${token}`
		const mailOptions: Mail.Options = {
			from: `URL Shortener<urlshortener@gmail.com>`,
			to: req.body.email,
			subject: `Reset Password request`,
			html: forgotPasswordEmail(userStatus.fullName, url),
		}

		await sendMail(mailOptions)
		res.json({ message: 'Success' })
	} catch (err) {
		console.log('Forgot Password Error')
		res.status(500).json({ message: 'Error' })
	}
})

router.get('/tokenstatus/:token', async (req: Request, res: Response) => {
	const token = req.params.token
	const userStatus = await user.findOne({
		token: token,
		tokenExpiration: { $gt: Date.now() },
	})
	if (!userStatus) return res.json({ message: 'Token expired' })
	return res.json({ message: 'Token accepted' })
})

router.post('/resetpassword', async (req: Request, res: Response) => {
	try {
		const { token, password } = req.body
		const userStatus = await user.findOne({
			token: token,
		})

		const hash = await bcrypt.hash(password, 10)
		await user.updateOne(
			{ _id: userStatus!._id },
			{
				password: hash,
				token: undefined,
				tokenExpiration: undefined,
			}
		)
		const mailOptions = {
			from: `URL Shortener<urlshortener@gmail.com>`,
			to: userStatus!.email,
			subject: `Reset Password Successful`,
			html: resetPasswordConfirmation(userStatus!.fullName),
		}
		await sendMail(mailOptions)
		res.json({ message: 'Success' })
	} catch (err) {
		res.json({ message: err })
	}
})

export default router
