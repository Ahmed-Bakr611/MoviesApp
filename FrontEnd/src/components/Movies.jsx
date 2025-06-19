import { useContext, useEffect, useState } from "react";
import Movie from "../components/Movie";
import ApiUtil from "../utils/ApiUtil";
import Loading from "./CustomLoading";
import CustomLoading from "./CustomLoading";
import { useDispatch, useSelector } from "react-redux";
import { Fab } from "@mui/material";
import AddMovieDialog from "./MovieDialog";
import AddIcon from "@mui/icons-material/Add";
import FloatingAddButton from "./FloatingAddButton";

export default function Movies() {
  const { movies, isLoading, error } = useSelector((state) => state.movies);
  const [openAdd, setOpenAdd] = useState(false);
  const dispatch = useDispatch();

  const handleAdd = (movie) => {
    dispatch(movie);
  };

  if (isLoading) return <CustomLoading />;
  return (
    <div>
      <FloatingAddButton />

      <h2 className="text-center my-4 text-light">Popular Movies</h2>
      <div className="movies-wrapper">
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            image={ApiUtil.getFullPath(movie.poster_path)}
          />
        ))}
      </div>
    </div>
  );
}
