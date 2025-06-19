import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Badge,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import StarIcon from "@mui/icons-material/Star";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/movie.png";
import { AddCall, Home, Info } from "@mui/icons-material";

// Define navigation items with optional icons
const navItems = [
  { label: "Home", path: "/movies", icon: <Home /> },
  { label: "About", path: "/about", icon: <Info /> },
  { label: "Contact", path: "/contact", icon: <AddCall /> },
  { label: "Favourites", path: "/favourites", icon: <StarIcon /> },
  { label: "Profile", path: "/profile", icon: <PersonIcon /> },
];

export default function CustomNavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { movies } = useSelector((state) => state.movies);
  const favCount = movies.filter((m) => m.isFavourite).length;
  const { isAuth } = useSelector((state) => state.user);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  // Mobile Drawer content
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box
        component={Link}
        to={isAuth ? "/movies" : "/"}
        // sx={{ height: 50, margin: "1rem auto" }}
      >
        <img
          src={logo}
          alt="logo"
          style={{ height: 50, margin: "1rem auto" }}
        />
      </Box>

      <List>
        {isAuth ? (
          navItems.map(({ label, path, icon }) => (
            <ListItem key={label} disablePadding>
              <ListItemButton component={Link} to={path}>
                {icon && <Box sx={{ mr: 1 }}>{icon}</Box>}
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/login">
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/register">
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Box
            component={Link}
            to={isAuth ? "/movies" : "/"}
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "white",
            }}
          >
            <img src={logo} alt="logo" style={{ height: 40, marginRight: 8 }} />
            <Typography variant="h6" noWrap>
              Movie App
            </Typography>
          </Box>

          {/* Desktop Nav */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            {isAuth &&
              navItems.map(({ label, path, icon }) =>
                icon ? (
                  <IconButton
                    key={label}
                    component={Link}
                    to={path}
                    sx={{ color: "white" }}
                  >
                    <Badge
                      badgeContent={label === "Favourites" ? favCount : null}
                      color="secondary"
                    >
                      {icon}
                    </Badge>
                  </IconButton>
                ) : (
                  <Typography
                    key={label}
                    component={Link}
                    to={path}
                    sx={{
                      color: "white",
                      textDecoration: "none",
                      fontWeight: "normal",
                    }}
                  >
                    {label}
                  </Typography>
                )
              )}

            {!isAuth && (
              <>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  color="inherit"
                  size="small"
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  color="secondary"
                  size="small"
                >
                  Register
                </Button>
              </>
            )}
          </Box>

          {/* Mobile menu icon */}
          <IconButton
            color="inherit"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}
