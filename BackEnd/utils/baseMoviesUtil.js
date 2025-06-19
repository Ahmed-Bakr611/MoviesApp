const path = require('path');
const fs = require('fs').promises;
const https = require('https');
const FilesUtil = require('../utils/filesUtil'); // adjust the path as needed

const apiURL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9813ce01a72ca1bd2ae25f091898b1c7';

async function fetchMovies() {
  return new Promise((resolve, reject) => {
    https.get(apiURL, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ movies: parsed.results });
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function baseMovies() {
  try {
    const dir = path.join(__dirname, 'data');
    const filePath = path.join(dir, 'movies.json');

    // Ensure directory exists
    try {
      await fs.mkdir(dir, { recursive: true });
    } catch (err) {
      console.error('Error creating directory:', err);
    }

    const moviesData = await fetchMovies();
    const file = new FilesUtil(filePath);
    await file.writeToFile(moviesData);

    console.log('✅ Movies saved to', filePath);
  } catch (error) {
    console.error('❌ baseMovies error:', error);
  }
}

module.exports = baseMovies;
