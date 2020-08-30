import { Request, Response, Router } from 'express'
import shortUrl from '../models/shortUrl'
import user from '../models/user'
import { body, validationResult } from 'express-validator'
const router: Router = Router()
import crypto from 'crypto'
import sendMail from '../config/sendMail'
import Mail from 'nodemailer/lib/mailer'
import newUser from '../templates/newUser'

router.get('/allurls', async (req: Request, res: Response) => {
	const urls = await shortUrl.find()
	res.json(urls)
})

router.post('/shorturl', async (req: Request, res: Response) => {
	await shortUrl.create({ full: req.body.fullURL })
	res.send('successful')
})

router.get('/url/:shortUrl', async (req, res) => {
	const urlData = await shortUrl.findOne({ short: req.params.shortUrl })
	if (urlData == null) return res.sendStatus(404)

	res.send(urlData.full)
})

router.post(
	'/register',
	[body('email').isEmail()],
	async (req: Request, res: Response) => {
		try {
			const errors = validationResult(req)
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
