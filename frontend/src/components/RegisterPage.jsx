import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!captchaValue) {
      setError(true); // Display error if captcha is not solved
      return;
    }

    const response = await fetch("http://127.0.0.1:8000/api/register/", {
      // Adjust the URL to your API
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        email,
        recaptcha: captchaValue,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("User registered:", data);
      window.location.href = "/login"; // Redirect to login page after successful registration
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
          Register
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
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              Please resolve the reCAPTCHA or check your inputs.
            </Typography>
          )}
          <Button
            fullWidth
            variant="contained"
            type="submit"
            color="primary"
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default RegisterPage;
