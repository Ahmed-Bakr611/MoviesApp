import { useEffect } from "react";
import { useSelector } from "react-redux";
import ApiUtil from "../utils/ApiUtil";

export default function AppExitHandler() {
  const movies = useSelector((state) => state.movies.list); // Adjust path to your store

  useEffect(() => {
    const handleUnload = () => {
      ApiUtil.backupMovies(movies); // Fire on exit
    };

    window.addEventListener("unload", handleUnload);
    return () => window.removeEventListener("unload", handleUnload);
  }, [movies]);

  return null;
}
