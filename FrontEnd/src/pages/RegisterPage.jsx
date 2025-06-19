import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  FormLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Block } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import PasswordField from "../components/PasswordField";

const countries = ["Egypt", "USA", "Germany", "France"];
const skillsList = ["React", "Node.js", "CSS", "Python"];

export default function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    country: "",
    gender: "",
    skills: [],
    comment: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
    // console.log([e.target.name]);
    // setFormData({ ...formData, [e.target.name]: e.target.value });
    // validate();
  };
  const handleSkillChange = (skill) => {
    setFormData((prev) => {
      const updatedSkills = prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill];

      validateField("skills", updatedSkills); // validate skills live

      return { ...prev, skills: updatedSkills };
    });
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "userName":
        if (!value.trim()) error = "Username is required";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email format";
        break;
      case "password":
        if (!value.trim()) error = "Password is required";
        break;
      case "country":
        if (!value) error = "Country is required";
        break;
      case "gender":
        if (!value) error = "Gender is required";
        break;
      case "skills":
        if (value.length === 0) error = "At least one skill required";
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.userName.trim()) errs.userName = "Username is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      errs.email = "Invalid email format";
    }
    if (!formData.password.trim()) errs.password = "Password is required";
    if (!formData.country) errs.country = "Country is required";
    if (!formData.gender) errs.gender = "Gender is required";
    if (formData.skills.length === 0)
      errs.skills = "At least one skill required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const { email, password } = formData;
    // localStorage.setItem("user", JSON.stringify({ email, password }));
    // dispatch(setUser({ email, password }));
    dispatch(setUser(formData));

    // Redirect to login
    navigate("/login");
    Swal.fire({
      icon: "success",
      title: "Registered Successful",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  };

  return (
    <Container maxWidth="sm" sx={{ marginBlock: 10, borderRadius: 10 }}>
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="User Name"
            name="userName"
            fullWidth
            margin="normal"
            required
            error={!!errors.userName}
            helperText={errors.userName}
            value={formData.userName}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            required
            error={!!errors.email}
            helperText={errors.email}
            value={formData.email}
            onChange={handleChange}
            inputProps={{
              pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
            }}
          />
          <PasswordField
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            helperText={errors.password}
          />
          <TextField
            select
            label="Country"
            name="country"
            fullWidth
            margin="normal"
            required
            error={!!errors.country}
            helperText={errors.country}
            value={formData.country}
            onChange={handleChange}
          >
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </TextField>

          <FormLabel sx={{ mt: 2 }} error={!!errors.gender}>
            Gender
          </FormLabel>
          <RadioGroup
            row
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>

          {errors.gender && (
            <Typography variant="caption" color="error">
              {errors.gender}
            </Typography>
          )}
          <FormLabel sx={{ mt: 2, display: "block" }} error={!!errors.skills}>
            Skills
          </FormLabel>
          <FormGroup row>
            {skillsList.map((skill) => (
              <FormControlLabel
                key={skill}
                control={
                  <Checkbox
                    checked={formData.skills.includes(skill)}
                    onChange={() => handleSkillChange(skill)}
                  />
                }
                label={skill}
              />
            ))}
          </FormGroup>
          {errors.skills && (
            <Typography variant="caption" color="error">
              {errors.skills}
            </Typography>
          )}

          <TextField
            label="Comment"
            name="comment"
            multiline
            rows={3}
            fullWidth
            margin="normal"
            value={formData.comment}
            onChange={handleChange}
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
