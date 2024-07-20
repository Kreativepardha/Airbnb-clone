import express from 'express'
import { userRouter } from './userRoute'
import { placerouter } from './placeRoute'
import multer from 'multer'

const router = express.Router()


router.use('/user',userRouter)
router.use('/place',placerouter)

export {
    router as mainRouter
}

