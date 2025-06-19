import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function EmptyFavouritesCard() {
  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: "auto",
        mt: 10,
        textAlign: "center",
        padding: 2,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="center" mb={2}>
          <StarBorderIcon sx={{ fontSize: 60, color: "grey.500" }} />
        </Box>
        <Typography variant="h6" color="text.secondary">
          Favourites is empty
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Start adding some movies to your favourites to see them here!
        </Typography>
      </CardContent>
    </Card>
  );
}
