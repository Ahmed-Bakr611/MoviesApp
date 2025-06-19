import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMovies } from "../redux/slices/moviesSlice";

export default function AppInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  return null;
}
