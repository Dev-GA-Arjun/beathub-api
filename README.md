# BeatHub Backend

## Overview

BeatHub is a backend application designed to manage a music platform with entities such as Artists, Albums, Songs, Users, and Playlists. The project focuses on building a structured and scalable data layer using MongoDB and Mongoose, following best practices for schema design and relationships.

This backend provides the foundation for handling music data, user preferences, and playlist management in a modular and maintainable way.

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose

---

## Project Structure

```
project-root/
│
├── models/
│   ├── Artist.js
│   ├── Album.js
│   ├── Song.js
│   ├── User.js
│   └── Playlist.js
│
├── config/
│   └── db.js
│
├── index.js
└── package.json
```

---

## Data Models

### Artist

- name (String, required, trimmed)
- genre (String, enum: Pop, Rock, HipHop, Jazz, Electronic)
- followers (Number, default: 0)
- socialLinks (Object: twitter, instagram)
- albums (Array of ObjectId references to Album)
- songs (Array of ObjectId references to Song)

### Album

- title (String, required)
- releaseDate (Date, default: current date)
- artist (ObjectId reference to Artist, required)
- songs (Array of ObjectId references to Song)

### Song

- title (String, required)
- duration (Number, required)
- streams (Number, default: 0)
- artist (ObjectId reference to Artist, required)
- album (ObjectId reference to Album, required)

### User

- username (String, required, unique)
- email (String, required, unique)
- password (String, required)
- favoriteSongs (Array of ObjectId references to Song)
- favoriteArtists (Array of ObjectId references to Artist)

### Playlist

- name (String, required)
- description (String)
- owner (ObjectId reference to User, required)
- songs (Array of ObjectId references to Song)

---

## Design Decisions

### Referencing vs Embedding

The application uses referencing instead of embedding for relationships between entities.

- Songs are referenced in playlists to avoid duplication and allow reuse across multiple playlists.
- Artists are referenced in songs to maintain a single source of truth for artist data.
- Albums and songs are linked using ObjectId references to maintain normalized data.

This approach improves scalability, reduces redundancy, and simplifies updates.

---

## Key Features

- Structured schema design using Mongoose
- Relationship management using ObjectId references
- Data validation using required, enum, default, and unique constraints
- Automatic timestamps for all models

---

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB running locally or via cloud (e.g., MongoDB Atlas)

### Installation

```bash
npm install
```

### Run the Server

```bash
node seed.js
```

---
