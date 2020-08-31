import { Request, Response, Router } from 'express'
import shortUrl from '../models/shortUrl'

const router: Router = Router({ mergeParams: true })

router.get('/allurls', async (req: Request, res: Response) => {
	const urls = await shortUrl.find()
	res.json(urls)
})

router.post('/shorturl', async (req: Request, res: Response) => {
	try {
		await shortUrl.create({ full: req.body.fullURL })
		res.send('successful')
	} catch {
		res.status(400).send('Error')
	}
})

router.get('/:shortUrl', async (req, res) => {
	const urlData = await shortUrl.findOne({ short: req.params.shortUrl })
	if (urlData == null) return res.sendStatus(404)

	res.send(urlData.full)
})

export default router
