import { Request, Response, Router } from 'express'
import shortUrl from '../models/shortUrl'
import user from '../models/user'
const router: Router = Router()

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

router.post('/register', async (req: Request, res: Response) => {
	try {
		const userExists = await user.findOne({ email: req.body.email })
		if (userExists) return res.send({ message: 'User already exists' })

		await user.create(req.body)
		res.send({ message: 'Successfully registered' })
	} catch (err) {
		console.log(err)
		res.send({ message: err._message })
	}
})

export default router
