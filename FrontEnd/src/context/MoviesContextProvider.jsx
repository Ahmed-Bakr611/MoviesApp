import { createContext, useEffect, useState } from "react";
import ApiUtil from "../utils/ApiUtil";

// Create the context
export const moviesContext = createContext();

// Create the provider component
export default function MoviesContextProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const data = await ApiUtil.getAllMovies();
      setMovies(data);
      setLoading(false);
    };
    fetchMovies();
  }, []);

  return (
    <moviesContext.Provider value={{ movies, loading, setMovies, setLoading }}>
      {children}
    </moviesContext.Provider>
  );
}
