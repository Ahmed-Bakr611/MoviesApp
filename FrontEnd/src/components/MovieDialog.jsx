import { Api } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import ApiUtil from "../utils/ApiUtil";
import Swal from "sweetalert2";

export default function AddMovieDialog({
  open,
  onClose,
  onSave,
  defaultValues,
}) {
  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    poster: null,
    posterPreview: null,
    // isFavourite: false,
    // rating: 0,
  });

  useEffect(() => {
    if (defaultValues) {
      setFormData({
        title: defaultValues.title || "",
        overview: defaultValues.overview || "",
        poster: null,
        posterPreview: ApiUtil.getFullPath(defaultValues.poster_path) || null,
        isFavourite: defaultValues.isFavourite,
        rating: defaultValues.rating,
      });
    }
  }, [defaultValues, open]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "poster" && files?.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      //
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          poster: file,
          posterPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    console.log("formData", formData);
    const form = new FormData();
    form.append("title", formData.title);
    form.append("overview", formData.overview); // your backend uses description
    // form.append("isFavourite", formData.isFavourite);
    if (formData.poster) {
      form.append("poster", formData.poster); // append the actual file
    }

    onSave(form); // send FormData instead of plain JSON
    const action = defaultValues ? "Updated" : "Added";
    Swal.fire({
      icon: "success",
      title: `${action} Successfully`,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    onClose();
    setFormData({ title: "", overview: "", poster: null, posterPreview: null });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, p: 2 },
      }}
    >
      <DialogTitle>Add New Movie</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <TextField
            label="Title"
            name="title"
            fullWidth
            required
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            label="Overview"
            name="overview"
            fullWidth
            multiline
            rows={3}
            required
            value={formData.overview}
            onChange={handleChange}
          />

          <Button variant="outlined" component="label">
            Upload Poster
            <input
              type="file"
              name="poster"
              accept="image/*"
              hidden
              onChange={handleChange}
            />
          </Button>

          {formData.posterPreview && (
            <Box
              component="img"
              src={formData.posterPreview}
              alt="Poster Preview"
              sx={{
                width: "100%",
                maxHeight: 300,
                objectFit: "contain",
                borderRadius: 2,
              }}
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {defaultValues ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
