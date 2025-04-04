import React from "react";
import { Button, Typography, Box } from "@mui/material";

const HomePage = () => {
  const handleLogout = () => {
    localStorage.removeItem("access_token"); // Remove the token on logout
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ width: 300, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Home
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          sx={{ mt: 2 }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
