import { Request, Response, Router } from 'express'
import {
	body,
	validationResult,
	Result,
	ValidationError,
} from 'express-validator'
import user from '../models/user'
import bcrypt from 'bcrypt'

const router: Router = Router({ mergeParams: true })

router.post(
	'/',
	[body('email').isEmail()],
	async (req: Request, res: Response) => {
		try {
			const errors: Result<ValidationError> = validationResult(req)
			if (!errors.isEmpty())
				return res.status(400).json({ errors: errors.array() })
			const userStatus = await user.findOne({ email: req.body.email })
			if (!userStatus) return res.json({ message: 'User not found' })
			if (!userStatus.active) return res.json({ message: 'User not active' })
			const match = await bcrypt.compare(
				req.body.password,
				userStatus.password!
			)
			if (match) res.status(200).json({ message: 'Successful' })
		} catch (err) {
			res.status(400).json({ message: 'Error logging in' })
		}
	}
)

export default router
