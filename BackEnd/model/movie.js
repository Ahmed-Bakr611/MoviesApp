const { v4: uuidv4 } = require('uuid');

class Movie {
  constructor({
    id,
    title,
    original_title,
    description,
    overview,
    poster,
    poster_path,
    backdrop,
    backdrop_path,
    isFavourite = false,
    genre_ids = [],
    popularity = 0,
    vote_average = 0,
    vote_count = 0,
    release_date = '',
    original_language = 'en',
    adult = false,
    video = false,
    createdAt
  }) {
    this.id = id || uuidv4(); // Keep TMDB ID if provided
    this.title = title || original_title || '';
    this.description = description || overview || '';
    this.poster_path = poster || poster_path || ''; // Unified: always store in `poster_path`
    this.backdrop_path = backdrop || backdrop_path || ''; // Unified: always store in `backdrop_path`
    this.isFavourite = isFavourite;
    this.genre_ids = genre_ids;
    this.popularity = popularity;
    this.vote_average = vote_average;
    this.vote_count = vote_count;
    this.release_date = release_date;
    this.original_language = original_language;
    this.adult = adult;
    this.video = video;
    this.createdAt = createdAt || new Date();
  }
}

module.exports = Movie;
