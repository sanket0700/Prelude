const mongoose = require('mongoose');

const Song = new mongoose.Schema({
    reference: { type:String, required: true },
    name: { type:String, required: true },
    artist: { type:String, required: true },
    cover: { type:String }
}, { collection: 'Song'});

const song = mongoose.model('song', Song);

module.exports = song;