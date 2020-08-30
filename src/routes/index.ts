import { Router } from 'express'
import registerRouter from './register'
import urlRouter from './url'

const router: Router = Router()

router.use('/register', registerRouter)
router.use('/url', urlRouter)

export default router
