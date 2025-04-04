import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!captchaValue) {
      setError(true); // Display error if captcha is not solved
      return;
    }

    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, recaptcha: captchaValue }), // Pass captcha response
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("access_token", data.access);
      console.log("Access Token:", data.access);
      console.log("Refresh Token:", data.refresh);
      window.location.href = "/"; // Redirect to HomePage after login
    } else {
      setError(true);
    }
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
      <Box sx={{ width: 300 }}>
        <Typography variant="h4" gutterBottom align="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            margin="normal"
          />
          <ReCAPTCHA
            sitekey="6LfU2gkrAAAAAIAitkJhHl6-6HXt7MW2oWZAVrkz" // Replace with your Site Key
            onChange={(value) => setCaptchaValue(value)}
          />
          {error && (
            <Typography color="error" variant="body2" align="center">
              Invalid credentials or reCAPTCHA not solved
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            type="submit"
            color="primary"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
        <Typography align="center" sx={{ mt: 2 }}>
          Don't have an account? <Link to="/register">Register</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
