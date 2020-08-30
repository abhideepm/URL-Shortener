import { Request, Response, Router } from 'express'
import shortUrl from '../models/shortUrl'

const router: Router = Router({ mergeParams: true })

router.get('/allurls', async (req: Request, res: Response) => {
	const urls = await shortUrl.find()
	res.json(urls)
})

router.post('/shorturl', async (req: Request, res: Response) => {
	await shortUrl.create({ full: req.body.fullURL })
	res.send('successful')
})

router.get('/:shortUrl', async (req, res) => {
	const urlData = await shortUrl.findOne({ short: req.params.shortUrl })
	if (urlData == null) return res.sendStatus(404)

	res.send(urlData.full)
})

export default router
