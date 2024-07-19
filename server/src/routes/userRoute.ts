import express from 'express'
import { getUser, loginUser, logoutUser, registerUser } from '../controllers/userController'
import { isAuthenticated } from '../middlewares/auth'

const router = express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get("/",isAuthenticated,getUser)
router.get('/logout',isAuthenticated,logoutUser)

export {
    router as userRouter
}