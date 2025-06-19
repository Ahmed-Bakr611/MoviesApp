import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AddMovieDialog from "./MovieDialog";
import { addMovie } from "../redux/slices/moviesSlice";

export default function FloatingAddButton() {
  const [openAdd, setOpenAdd] = useState(false);
  const dispatch = useDispatch();

  const handleAdd = (newMovieData) => {
    dispatch(addMovie(newMovieData));
    setOpenAdd(false);
  };

  return (
    <>
      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        onClick={() => setOpenAdd(true)}
      >
        <AddIcon />
      </Fab>

      {/* Add Dialog (same component as Edit) */}
      <AddMovieDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSave={handleAdd}
      />
    </>
  );
}
