import express from 'express'
import { upload, uploadPhotos } from '../controllers/placeController'
import multer from 'multer'


const router = express.Router()
const photosMiddleware = multer({dest:'uploads/'})

router.post("/upload-by-link",uploadPhotos)
router.post("/upload",photosMiddleware.array('photos',100),upload)



export {
    router as placerouter
}