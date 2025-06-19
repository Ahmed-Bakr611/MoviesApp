import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMovie,
  toggleFavourite,
  updateMovie,
} from "../redux/slices/moviesSlice";
import { Link } from "react-router-dom";
import ApiUtil from "../utils/ApiUtil";
import AddMovieDialog from "./MovieDialog";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Swal from "sweetalert2";

export default function CustomCard({ id, hasDelete = false }) {
  const { movies } = useSelector((state) => state.movies);
  const movie = movies.find((m) => m.id === id);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleSettingsClick = (e) => setAnchorEl(e.currentTarget);
  const handleSettingsClose = () => setAnchorEl(null);

  const handleEdit = () => {
    handleSettingsClose();
    setIsEditOpen(true);
  };

  const handleDelete = () => {
    handleSettingsClose();
    setIsDeleteOpen(true);
  };
  if (!movie) return null;

  return (
    <>
      <Card
        sx={{
          width: 280,
          backgroundColor: "primary.light",
          color: "white",
          position: "relative",
          borderRadius: 2,
        }}
      >
        <CardActionArea
          component={Link}
          to={`/movies/${movie.id}`}
          sx={{ pb: 1 }}
        >
          <CardMedia
            component="img"
            height="350"
            image={ApiUtil.getFullPath(movie.poster_path)}
            alt={movie.title}
          />
          <CardContent>
            <Typography variant="h6" noWrap>
              {movie.title}
            </Typography>
          </CardContent>
        </CardActionArea>
        {/* Favourite Toggle */}
        <Box sx={{ position: "absolute", top: 10, right: 10, display: "flex" }}>
          <IconButton
            onClick={() => dispatch(toggleFavourite(movie.id))}
            sx={{ color: "red" }}
          >
            {hasDelete ? (
              <DeleteIcon />
            ) : movie.isFavourite ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>

          {/* Settings Menu */}
          <IconButton
            aria-label="settings"
            onClick={handleSettingsClick}
            sx={{ color: "black" }}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleSettingsClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleEdit}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Card>

      {/* Edit Modal */}
      <AddMovieDialog
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={(updatedMovie) => {
          dispatch(updateMovie({ id, movieData: updatedMovie }));
          setIsEditOpen(false);
        }}
        defaultValues={movie}
      />

      {/* Delete Modal */}
      <ConfirmDeleteDialog
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          dispatch(deleteMovie(id));
          setIsDeleteOpen(false);
          Swal.fire({
            icon: "success",
            title: `Deleted Successfully`,
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
        }}
        title={`"${movie.title}"`}
      />
    </>
  );
}
