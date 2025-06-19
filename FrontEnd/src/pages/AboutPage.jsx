import React from "react";
import { Container, Grid, Typography, Box } from "@mui/material";

export default function AboutPage() {
  return (
    <Box component="section" py={5} marginBlock={10}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              About Us
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Welcome to CineWorld – your ultimate destination for everything
              movies! Whether you're a fan of timeless classics or the latest
              blockbusters, we bring you curated content to ignite your passion
              for cinema.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} mdOffset={1}>
            <Typography variant="h6" color="text.secondary" paragraph>
              At CineWorld, we’re more than just a movie website. We provide
              honest reviews, in-depth analyses, trending trailers, and
              personalized recommendations to help you choose your next favorite
              film. We celebrate the art of storytelling through motion picture.
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Our team of movie enthusiasts and critics works hard to keep you
              updated with what's hot in the world of film. Join us and be part
              of a community that lives and breathes cinema.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
