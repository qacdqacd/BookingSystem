import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        p: 2,
        backgroundColor: "#eee",
        textAlign: "center",
        mt: "auto",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Booking System. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
