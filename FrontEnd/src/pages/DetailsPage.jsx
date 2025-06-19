import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import ApiUtil from "../utils/ApiUtil"; // adjust path as needed
import MovieDetailsCard from "../components/MovieDetailsCard";
import CustomLoading from "../components/CustomLoading";
import { moviesContext } from "../context/MoviesContextProvider";
import { useSelector } from "react-redux";

export default function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movies, loading } = useSelector((state) => state.movies);
  const movie = movies.find((m) => m.id.toString() === id);

  useEffect(() => {
    if (!loading && !movie) {
      navigate("/not-found");
    }
  }, [loading, movie, navigate]);

  if (loading) return <CustomLoading />;

  if (!movie) return null;

  return <MovieDetailsCard id={id}></MovieDetailsCard>;
}
