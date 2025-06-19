import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavourite } from "../redux/slices/moviesSlice";
import ApiUtil from "../utils/ApiUtil";
import Movie from "./Movie";
import EmptyFavouritesCard from "./EmptyFavouritesCard";

export default function FavouirteMovies() {
  const { movies } = useSelector((state) => state.movies);
  // const favouriteMovies = movies.filter((m) => m.isFavourite === true);
  const favouriteMovies = movies.filter((m) => m.isFavourite);
  console.log("movies", movies);
  console.log("fav", favouriteMovies);

  if (!favouriteMovies || !favouriteMovies.length) {
    return <EmptyFavouritesCard />;
  }
  return (
    <div>
      <h2 className="text-center my-4 text-light">Popular Movies</h2>
      <div className="movies-wrapper">
        {favouriteMovies.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            image={ApiUtil.getFullPath(movie.poster_path)}
            hasDelete={true}
          />
        ))}
      </div>
    </div>
  );
}
