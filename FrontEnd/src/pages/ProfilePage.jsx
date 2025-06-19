import React from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PublicIcon from "@mui/icons-material/Public";
import WcIcon from "@mui/icons-material/Wc";
import CodeIcon from "@mui/icons-material/Code";
import CommentIcon from "@mui/icons-material/Comment";
import { useSelector } from "react-redux";

export default function ProfilePage() {
  const user = useSelector((state) => state.user);

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 10, px: 2 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              bgcolor: "primary.main",
              fontSize: 24,
            }}
          >
            {user.userName?.charAt(0).toUpperCase() || "U"}
          </Avatar>
          <Typography variant="h5" fontWeight="bold">
            {user.userName || "User"}
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <EmailIcon color="action" />
            <Typography>{user.email}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <PublicIcon color="action" />
            <Typography>{user.country}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <WcIcon color="action" />
            <Typography>{user.gender}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <CodeIcon color="action" />
            <Typography>Skills:</Typography>
            <Box>
              {user.skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  variant="outlined"
                  size="small"
                  sx={{ mx: 0.5, bgcolor: "blueviolet", color: "white" }}
                />
              ))}
            </Box>
          </Box>

          <Box display="flex" alignItems="flex-start" gap={1}>
            <CommentIcon color="action" />
            <Box>
              <Typography variant="subtitle2">Comment:</Typography>
              <Typography color="text.secondary">{user.comment}</Typography>
            </Box>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
