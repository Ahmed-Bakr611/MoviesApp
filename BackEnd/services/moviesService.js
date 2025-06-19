const Movie = require('../model/movie');

class MovieStore {
  constructor(fileUtils) {
    this.fileUtils = fileUtils;
    this.movies = [];
  }

  async init() {
    const data = await this.fileUtils.readFromFile();
    this.movies = data.movies || [];
  }

  async addMovie(movieData) {
    const movie = new Movie(movieData);
    console.log(this.movies);
    this.movies.push(movie);
    await this.fileUtils.writeToFile({ movies: this.movies });;
    return movie;
  }
  replaceAllMovies(newMovies) {
    this.movies = newMovies;
  }

  async deleteMovie(movieID) {
    const movie = this.getMovieById(movieID);
    if (!movie) return false;

    this.movies = this.movies.filter(m => m.id !== movieID);
    await this.fileUtils.writeToFile({ movies: this.movies });;
    return true;
  }

  async updateMovie(id, updatedData) {
    const movie = this.getMovieById(id);
    if (!movie) return false;

    this.movies = this.movies.map(m =>
      m.id === id ? { ...m, ...updatedData, id: m.id, createdAt: m.createdAt } : m
    );

    await this.fileUtils.writeToFile({ movies: this.movies });;
    return true;
  }

  getAllMovies() {
    return this.movies;
  }

  getMovieById(id) {
    return this.movies.find(m => m.id === id);
  }

  getMoviesByTitle(title) {
    const search = title.toLowerCase();
    return this.movies.filter(m => m.title.toLowerCase().startsWith(search));
  }

  async toggleFavourite(id) {
    const movie = this.getMovieById(id);
    if (!movie) return false;

    movie.isFavourite = !movie.isFavourite;
    await this.fileUtils.writeToFile({ movies: this.movies });;
    return movie;
  }

  async saveMovies() {

  }
}

module.exports = MovieStore;
