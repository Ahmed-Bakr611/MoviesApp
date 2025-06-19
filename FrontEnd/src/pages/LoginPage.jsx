import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { setIsAuth } from "../redux/slices/userSlice";
import PasswordField from "../components/PasswordField";
export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const validate = () => {
    const errs = {};
    if (!formData.email.trim()) errs.email = "Email is required";
    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    )
      errs.email = "Invalid email format";

    if (!formData.password.trim()) errs.password = "Password is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (formData.email === user.email && formData.password === user.password) {
      dispatch(setIsAuth());
      navigate("/movies");
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Incorrect email or password",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      setErrors((prev) => ({
        ...prev,
        email: "Incorrect email or password",
        password: "Incorrect email or password",
      }));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginBlock: 10 }}>
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            required
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />

          <PasswordField
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            helperText={errors.password}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
