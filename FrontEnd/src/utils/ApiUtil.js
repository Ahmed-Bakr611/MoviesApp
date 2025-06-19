import axios from "axios";

// Base URL for your local backend
const baseUrl = "http://localhost:3000"
const localUrl = `${baseUrl}/api/movies`;
const TMDB_BASE = 'https://image.tmdb.org/t/p/w500';


const ApiUtil = {
  // 🏠 Get all local movies
  getAllMovies: async () => {
    try {
      const response = await axios.get(localUrl);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      throw error;
    }
  },

  // 🏠 Get a movie by ID
  getMovieById: async (id) => {
    try {
      const response = await axios.get(`${localUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch movie with ID ${id}:`, error);
      throw error;
    }
  },

  // 🏠 Add a new movie (with form data: title, description, poster file)
  addMovie: async (formData) => {
    try {
      const response = await axios.post(localUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to add movie:", error);
      throw error;
    }
  },

  // 🏠 Update an existing movie (without file upload)
  updateMovie: async (id, updatedData) => {
    try {
      const response = await axios.put(`${localUrl}/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error(`Failed to update movie with ID ${id}:`, error);
      throw error;
    }
  },

  // 🏠 Delete a movie
  deleteMovie: async (id) => {
    try {
      const response = await axios.delete(`${localUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to delete movie with ID ${id}:`, error);
      throw error;
    }
  },

  // 🏠 Toggle favourite
  toggleFavourite: async (id) => {
    try {
      const response = await axios.patch(`${localUrl}/${id}/favourite`);
      return response.data;
    } catch (error) {
      console.error(`Failed to toggle favourite for movie with ID ${id}:`, error);
      throw error;
    }
  },
  getFullPath: (poster) => {
    // 
    // if (!poster) return "";
    const base = poster?.toString().startsWith("/images") ? baseUrl : TMDB_BASE;
    return base + poster;
  },

  backupMovies: async (movies) => {
    try {
      await navigator.sendBeacon(
        `${localUrl}/backup`,
        new Blob([JSON.stringify(movies)], { type: "application/json" })
      );
    } catch (error) {
      console.error("Failed to backup movies:", error);
    }
  }
};

export default ApiUtil;
