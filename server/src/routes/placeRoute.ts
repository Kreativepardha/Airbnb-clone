import express from 'express'
import { uploadPhotos } from '../controllers/placeController'


const router = express.Router()

router.post("/upload-by-link",uploadPhotos)



export {
    router as placerouter
}