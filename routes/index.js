const Router = require('express')
const projectRouter = require('./project.router')
const authRouter = require('./auth.router')
const commentRouter = require('./comment.router')

const router = new Router()

router.use('/project', projectRouter)
router.use('/auth', authRouter)
router.use('/comment', commentRouter)

module.exports = router