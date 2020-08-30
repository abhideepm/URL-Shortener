import crypto from 'crypto'
import { Request, Response, Router } from 'express'
import {
	body,
	validationResult,
	ValidationError,
	Result,
} from 'express-validator'
import Mail from 'nodemailer/lib/mailer'
import sendMail from '../config/sendMail'
import user from '../models/user'
import newUser from '../templates/newUser'
const router: Router = Router({ mergeParams: true })

router.post(
	'/',
	[body('email').isEmail()],
	async (req: Request, res: Response) => {
		try {
			const errors: Result<ValidationError> = validationResult(req)
			if (!errors.isEmpty())
				return res.status(400).json({ errors: errors.array() })

			await user.create(req.body)

			const token: string = crypto.randomBytes(16).toString('hex')
			await user.findOneAndUpdate(
				{ email: req.body.email },
				{ token: token, tokenExpiration: Date.now() + 15 * 60 * 1000 }
			)
			const url = `something/${token}`
			const mailOptions: Mail.Options = {
				from: `URL Shortener<urlshortener@gmail.com>`,
				to: req.body.email,
				subject: `Signup Successful`,
				html: newUser(req.body.fullName, url),
			}
			await sendMail(mailOptions)
			res.status(200).send({ message: 'Successfully registered' })
		} catch (err) {
			res.status(400).send({ message: 'Error with registration' })
		}
	}
)

export default router
