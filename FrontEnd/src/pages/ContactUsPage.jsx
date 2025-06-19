import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

export default function ContactUsPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Box component="section" sx={{ py: 5 }}>
      <Container>
        {/* Header Section */}
        <Box textAlign="center" mb={5}>
          <Typography variant="subtitle1" color="text.secondary">
            Let's Talk
          </Typography>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Lorem ipsum dolor, sit amet elit Quamnitm veniam dicta, quos nemo
            minima nulla ducimus officii nulla ducimus officiis! Lorem ipsum
            dolor, sit amet elit Quamnitm.
          </Typography>
        </Box>

        {/* Form Section */}
        <Grid container justifyContent="center">
          <Grid item xs={12} md={10} lg={6}>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* First Row: First and Last Name */}
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    required
                  />
                </Grid>

                {/* Second Row: Message */}
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Your Message"
                    multiline
                    rows={4}
                    variant="outlined"
                    required
                  />
                </Grid>

                {/* Third Row: Submit Button */}
                <Grid item size={12}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    size="large"
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
