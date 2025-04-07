import React from "react";
import { Box, Button, Typography, Stack, Paper } from "@mui/material";

const HomePage = () => {
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  const handleCreateBooking = () => {
    // Redirect or open booking creation page
    window.location.href = "/create-booking";
  };

  const handleViewSchedule = () => {
    // Redirect to schedule page
    window.location.href = "/schedule";
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{ p: 4, maxWidth: 400, width: "100%", textAlign: "center" }}
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
    </Box>
  );
};

export default HomePage;
