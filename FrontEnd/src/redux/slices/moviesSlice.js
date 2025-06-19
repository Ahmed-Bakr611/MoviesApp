import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiUtil from "../../utils/ApiUtil";

// Initial state
const initialState = {
  movies: [],
  favouriteMovies: [],
  isLoading: true,
  error: null,
};

// Async thunk to fetch movies
export const getMovies = createAsyncThunk("movies/getAll", async () => {
  return await ApiUtil.getAllMovies();
});

export const addMovie = createAsyncThunk("movies/addMovie", async (newMovie, thunkAPI) => {
  try {
    const data = await ApiUtil.addMovie(newMovie);

    // ✅ Refetch the movie list after update
    thunkAPI.dispatch(getMovies());

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Create failed");
  }
})
export const updateMovie = createAsyncThunk("movies/updateMovie", async (payload, thunkAPI) => {
  const { id, movieData } = payload
  try {
    const data = await ApiUtil.updateMovie(id, movieData);

    // ✅ Refetch the movie list after update
    thunkAPI.dispatch(getMovies());

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Update failed");
  }
})
export const deleteMovie = createAsyncThunk("movies/deleteMovie", async (id, thunkAPI) => {
  try {
    const data = await ApiUtil.deleteMovie(id);

    // ✅ Refetch the movie list after update
    thunkAPI.dispatch(getMovies());

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "delete failed");
  }
})


// Slice
const moviesSlice = createSlice({
  name: "movies",
  initialState: initialState,

  reducers: {
    toggleFavourite: (state, action) => {
      const movieId = action.payload;
      const movie = state.movies.find(m => m.id === movieId);
      if (movie) movie.isFavourite = !movie.isFavourite;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.movies = action.payload;
        // state.favouriteMovies = action.payload.filter(movie => movie.isFavourite);
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to load movies";
        console.error("Movies fetch failed:", action.error);
      })
      .addCase(addMovie.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addMovie.fulfilled, (state, action) => {

        state.isLoading = false;
        state.error = null;
        state.movies.push(action.payload);
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to add movie";
        console.error("Movie Creation failed:", action.error);
      })
      // Update Movie
      .addCase(updateMovie.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        const idx = state.movies.findIndex(m => m.id === action.payload.id);
        if (idx !== -1) state.movies[idx] = action.payload;
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Delete Movie
      .addCase(deleteMovie.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movies = state.movies.filter(m => m.id !== action.payload.id);
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });


  },
});

export default moviesSlice.reducer;
export const { toggleFavourite } = moviesSlice.actions;