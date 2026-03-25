require('dotenv').config();
const mongoose = require('mongoose');
// Ensure these paths match where you put your models
const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Song = require('../models/Song');
const User = require('../models/User');
const Playlist = require('../models/Playlist');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // 1. Clear existing data
    await Promise.all([
      Artist.deleteMany({}), Album.deleteMany({}), 
      Song.deleteMany({}), User.deleteMany({}), Playlist.deleteMany({})
    ]);

    // 2. Create Artist
    const artist = await Artist.create({ name: 'Daft Punk', genre: 'Electronic' });
    
    // 3. Create Album (Linked to Artist)
    const album = await Album.create({
      title: 'Discovery',
      releaseYear: 2001,
      artist: artist._id 
    });

    // 4. Create Song (Linked to Album and Artist)
    const song = await Song.create({
      title: 'One More Time',
      duration: 320,
      album: album._id,
      artist: artist._id
    });

    // 5. Create User
    const user = await User.create({ username: 'music_fan_01', email: 'fan@example.com' });

    // 6. Create Playlist (Linked to User and Songs)
    await Playlist.create({
      name: 'Gym Jams',
      user: user._id,
      songs: [song._id]
    });

    console.log(' Seeding Complete!');
    process.exit(0);
  } catch (error) {
    console.error(' Seeding Failed:', error);
    process.exit(1);
  }
}

seed();