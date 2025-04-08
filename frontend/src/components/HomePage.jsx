import React from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  Paper,
  Container,
} from "@mui/material";

const HomePage = () => {
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  const handleCreateBooking = () => {
    window.location.href = "/create-booking";
  };

  const handleViewSchedule = () => {
    window.location.href = "/schedule";
  };

  return (
    <Box sx={{ py: 8, minHeight: "50vh" }}>
      <Container maxWidth="sm">
        <Paper
          elevation={4}
          sx={{ p: 4, textAlign: "center", borderRadius: 3 }}
        >
          <Typography variant="h4" gutterBottom>
            Booking System
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Welcome! What would you like to do today?
          </Typography>

          <Stack spacing={2} mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateBooking}
            >
              Create Booking
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleViewSchedule}
            >
              View Schedule
            </Button>
            <Button variant="text" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default HomePage;
