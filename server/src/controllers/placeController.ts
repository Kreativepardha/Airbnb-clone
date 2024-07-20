import path from "path";
import fs from 'fs'
const express = require('express');
const imageDownloader = require('image-downloader');
const router = express.Router();

export const uploadPhotos = async (req: any, res: any) => {
    const { link } = req.body;

    if (!link) {
        return res.status(400).json({ error: 'Missing photo link in request body' });
    }

    const newName = 'photo' + Date.now() + '.jpg';
    const filePath = path.join(__dirname, 'uploads', newName);
    try {
        await imageDownloader.image({
            url: link,
            dest: filePath,
        });
        res.json({ filename: newName });
    } catch (error) {
        console.error('Error downloading image:', error);
        res.status(500).json({ error: 'Failed to download image' });
    }
}

export const upload = async(req:any,res:any) => {
        const uploadedFiles: string[] = [];

        for (let i = 0; i < req.files.length; i++) {
            const file = req.files[i]
            const {path: tempPath, originalname} = file;

            const ext = path.extname(originalname)
            const newPath = path.join(__dirname, 'uploads', `${path.basename(tempPath)}${ext}`);
            fs.renameSync(tempPath, newPath)
            uploadedFiles.push(path.basename(newPath))
        }
        res.json(uploadedFiles)

 }  