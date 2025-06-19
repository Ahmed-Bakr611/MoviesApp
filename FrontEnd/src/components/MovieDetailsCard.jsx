import { useSelector } from "react-redux";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Divider,
  Chip,
  Stack,
  Tooltip,
} from "@mui/material";
import CustomLoading from "./CustomLoading";
import ApiUtil from "../utils/ApiUtil";

export default function MovieDetailsCard({ id }) {
  const { movies } = useSelector((state) => state.movies);
  const movie = movies.find((m) => m.id.toString() === id);

  if (!movie) return <CustomLoading />;

  const {
    title,
    original_title,
    overview,
    poster_path,
    backdrop_path,
    vote_average,
    vote_count,
    popularity,
    release_date,
    adult,
    video,
    original_language,
    genre_ids,
  } = movie;

  return (
    <Card
      elevation={4}
      sx={{
        maxWidth: 900,
        margin: "100px auto",
        borderRadius: 4,
        overflow: "hidden",
        backgroundColor: "#fafafa",
      }}
    >
      {/* Backdrop image */}
      {/* <Box
        sx={{
          height: { xs: 180, sm: 250, md: 300 },
          backgroundImage: `url(${ApiUtil.getFullPath(backdrop_path)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      /> */}

      <Box display="flex" flexDirection={{ xs: "column", sm: "row" }}>
        {/* Poster */}
        <CardMedia
          component="img"
          image={ApiUtil.getFullPath(poster_path)}
          alt={title}
          sx={{
            width: { xs: "100%", sm: 250 },
            objectFit: "cover",
            backgroundColor: "#f0f0f0",
          }}
        />

        {/* Content */}
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h5" fontWeight="bold">
            {title}
          </Typography>
          {original_title !== title && (
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              ({original_title})
            </Typography>
          )}

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 1, mb: 2 }}
          >
            {overview}
          </Typography>

          <Box display="flex" alignItems="center" mb={2}>
            <Rating
              name="rating"
              value={vote_average / 2}
              precision={0.5}
              readOnly
              sx={{ color: "#fbc02d" }}
            />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {vote_average.toFixed(1)} / 10 ({vote_count} votes)
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Stack direction="row" spacing={1} gap={2} flexWrap="wrap">
            <Chip label={`Release: ${release_date}`} />
            <Chip label={`Popularity: ${popularity}`} color="primary" />
            <Chip
              label={`Language: ${original_language.toUpperCase()}`}
              variant="outlined"
            />
            <Chip
              label={adult ? "18+ Adult" : "Family Friendly"}
              color={adult ? "error" : "success"}
            />
            <Box display={"flex"} gap={4}>
              <Chip
                label={`Video: ${video ? "Yes" : "No"}`}
                variant="outlined"
                color="primary"
              />
              <Tooltip title="Genre IDs used by TMDB API">
                <Chip
                  label={`Genres: ${genre_ids.join(", ")}`}
                  variant="outlined"
                  sx={{ bgcolor: "skyblue" }}
                />
              </Tooltip>
            </Box>
          </Stack>
        </CardContent>
      </Box>
    </Card>
  );
}
