const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const {GridFsStorage} = require('multer-gridfs-storage');
const song = require('./models/song');
const crypto = require('crypto');


const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/user', require('./routes/user'));



const CONNECTION_URL = "MONGO_URI";
const PORT = process.env.PORT || 5000;



mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));



const storage = new GridFsStorage({
    
    url: 'MONGO_URI',
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if(err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'media'
                };
                resolve(fileInfo);
            });
        });
    },
    options: { useUnifiedTopology: true }
});

const upload = multer({storage});



app.put('/addSong', upload.fields([{ name: 'song', maxCount: 1 }, { name: 'cover', maxCount: 1 }]), async (req, res) => {

    try{

        await song.create({
            reference: req.files.song[0].filename,
            name: req.body.name,
            artist: req.body.artist,
            cover: req.files.cover[0].filename
        });

        return res.status(200).json({ message: `Successfully uploaded ${req.body.name}`});

    } catch(error){
        console.log(error);
        return res.status(500).json({ message: "Something went wrong!"});
    }

});


app.get('/allSongs', async (req, res) => {
    try{
        all = await song.find({});
        return res.status(200).json({ message: "Check console!", songs: all });
    } catch(error){
        console.log(error);
    }
});



app.get('/play/:reference', async(req, res) => {
    const file = req.params.reference;
    try{
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            chunkSizeBytes: 1024,
            bucketName: 'media'
        });

        const downloadStream = bucket.openDownloadStreamByName(file);

        downloadStream.on('data', (chunk) => {
            res.write(chunk);
        });

        downloadStream.on('error', () => {
            res.sendStatus(404);
        });

        downloadStream.on('end', () => {
            res.end();
        });

    } catch (error){
        console.log(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
})

app.get('/cover-art/:reference', async(req, res) => {
    const file = req.params.reference;
    try{
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            chunkSizeBytes: 1024,
            bucketName: 'media'
        });

        const downloadStream = bucket.openDownloadStreamByName(file);

        downloadStream.on('data', (chunk) => {
            res.write(chunk);
        });

        downloadStream.on('error', () => {
            res.sendStatus(404);
        });

        downloadStream.on('end', () => {
            res.end();
        });

    } catch (error){
        console.log(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
})