const express = require('express');
const imageDownloader = require('image-downloader');
const router = express.Router();

export const uploadPhotos = async (req: any, res: any) => {
    const { link } = req.body;

    if (!link) {
        return res.status(400).json({ error: 'Missing photo link in request body' });
    }

    const newName = 'photo' + Date.now() + '.jpg';

    try {
        await imageDownloader.image({
            url: link,
            dest: __dirname + "/uploads/" + newName,
        });

        res.json({ filename: newName });
    } catch (error) {
        console.error('Error downloading image:', error);
        res.status(500).json({ error: 'Failed to download image' });
    }
}
