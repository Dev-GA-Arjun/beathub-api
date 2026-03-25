require('dotenv').config();
const mongoose = require('mongoose');

const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Song = require('../models/Song');
const User = require('../models/User');
const Playlist = require('../models/Playlist');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear data
    await Promise.all([
      Artist.deleteMany({}),
      Album.deleteMany({}),
      Song.deleteMany({}),
      User.deleteMany({}),
      Playlist.deleteMany({})
    ]);

    // 1. Artist
    const artist = await Artist.create({
      name: 'Daft Punk',
      genre: 'Electronic'
    });

    // 2. Album
    const album = await Album.create({
      title: 'Discovery',
      releaseDate: new Date('2001-01-01'),
      artist: artist._id
    });

    // 3. Song
    const song = await Song.create({
      title: 'One More Time',
      duration: 320,
      artist: artist._id,
      album: album._id
    });

    // 4. Update relationships (IMPORTANT 🔥)
    artist.albums.push(album._id);
    artist.songs.push(song._id);
    await artist.save();

    album.songs.push(song._id);
    await album.save();

    // 5. User
    const user = await User.create({
      username: 'music_fan_01',
      email: 'fan@example.com',
      password: '123456' // required
    });

    // 6. Playlist
    await Playlist.create({
      name: 'Gym Jams',
      owner: user._id, // correct field
      songs: [song._id]
    });

    console.log('Seeding Complete!');
    process.exit(0);

  } catch (error) {
    console.error('Seeding Failed:', error);
    process.exit(1);
  }
}

seed();