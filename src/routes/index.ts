import { Router } from 'express'
import registerRouter from './register'
import urlRouter from './url'
import loginRouter from './login'
import passwordRouter from './password'

const router: Router = Router()

router.use('/register', registerRouter)
router.use('/url', urlRouter)
router.use('/login', loginRouter)
router.use('/password', passwordRouter)

export default router
