const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs')
process.loadEnvFile();
const FilesUtil = require('./utils/filesUtil');
const MovieStore = require('./services/moviesService');
const { log } = require('console');
const baseMovies = require('./utils/baseMoviesUtil');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
// Multer (File Uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'images/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Initialize MovieStore
const movieStore = new MovieStore(new FilesUtil(process.env.MOVIES_FILE_PATH));

(async () => {
  await movieStore.init();
  // console.log(movieStore.movies);

  // ✅ Get all movies
  app.get('/api/movies', (req, res) => {
    res.json(movieStore.getAllMovies());
  });

  // ✅ Get movie by ID
  app.get('/api/movies/:id', (req, res) => {
    const movie = movieStore.getMovieById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  });

  // ✅ Add movie
  app.post('/api/movies', upload.single('poster'), async (req, res) => {
    const { title, overview } = req.body;
    const poster = req.file ? `/images/${req.file.filename}` : '';
    const movie = await movieStore.addMovie({ title, overview, poster });
    res.status(201).json(movie);
  });

  app.put('/api/movies/:id', upload.single('poster'), async (req, res) => {
    // const { title, overview } = req.body;
    const poster = req.file ? `/images/${req.file.filename}` : undefined;

    console.log(req.body);
    const updatedData = req.body;
    if (poster) updatedData.poster_path = poster; // ✅ overwrite poster_path field

    const updated = await movieStore.updateMovie(req.params.id, updatedData);
    if (!updated) return res.status(404).json({ message: 'Movie not found' });

    res.json({ message: 'Movie updated successfully' });
  });


  // ✅ Delete movie + its image
  app.delete('/api/movies/:id', async (req, res) => {
    const movie = movieStore.getMovieById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    // Delete poster image from server if exists
    if (movie.poster_path) {
      const imagePath = path.join(__dirname, movie.poster_path);
      fs.unlink(imagePath, (err) => {
        if (err) console.warn('❌ Image not found or failed to delete:', imagePath);
        else console.log('🗑️ Image deleted:', imagePath);
      });
    }

    // Delete movie data
    const deleted = await movieStore.deleteMovie(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Movie not found' });

    res.json({ message: 'Movie and poster deleted successfully' });
  });


  // ✅ Toggle favourite
  app.patch('/api/movies/:id/favourite', async (req, res) => {
    const movie = await movieStore.toggleFavourite(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  });

  app.post("/api/movies/backup", express.json(), async (req, res) => {
    const movies = req.body;
    console.log("inside Backup")


    if (!Array.isArray(movies)) {
      return res.status(400).json({ message: "Invalid movie data" });
    }

    try {
      await movieStore.replaceAllMovies(movies); // You can create this method
      await movieStore.saveToFile(); // Save to file
      res.status(200).json({ message: "Backup successful" });
    } catch (err) {
      console.error("Backup error:", err);
      res.status(500).json({ message: "Failed to backup movies" });
    }
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`🎬 Movie server running at http://localhost:${PORT}`);
    // baseMovies();
  });
})();



//const TMDB_BASE = 'https://image.tmdb.org/t/p/w500';
//const posterUrl = `${TMDB_BASE}${movie.poster_path}`;
//const backdropUrl = `${TMDB_BASE}${movie.backdrop_path}`;