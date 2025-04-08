import { useState } from "react";
import {
  Button,
  Typography,
  Input,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { Card, CardContent, CardHeader } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios"; // You can use axios or fetch

export default function ProfilePage() {
  const [avatar, setAvatar] = useState("/placeholder.svg");
  const [name, setName] = useState("Meadow Richardson");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file)); // Display the selected photo
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("bio", bio);
    formData.append("password", password);
    formData.append("newPassword", newPassword);
    formData.append("confirmPassword", confirmPassword);

    // Check if there's a new avatar image to upload
    if (avatar && avatar !== "/placeholder.svg") {
      const avatarFile = document.querySelector("#file-input").files[0];
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }
    }

    try {
      const response = await axios.put("/api/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Profile updated successfully:", response.data);
      // Optionally, update the UI with the new profile info
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="px-8 py-6 space-y-6 sm:px-10">
      <header className="space-y-4">
        <div className="flex items-center space-x-6">
          <img
            src={avatar}
            alt="Avatar"
            width="120"
            height="120"
            className="rounded-full"
            style={{ objectFit: "cover" }}
          />
          <div className="space-y-2">
            <Typography variant="h5" fontWeight="bold">
              {name}
            </Typography>
            <Input
              type="file"
              inputProps={{ accept: "image/*" }}
              onChange={handleAvatarChange}
              style={{ display: "none" }}
              id="file-input"
            />
            <label htmlFor="file-input">
              <Button variant="outlined" size="small" component="span">
                Change photo
              </Button>
            </label>
          </div>
        </div>
      </header>

      <div className="space-y-8">
        <Card variant="outlined">
          <CardContent>
            <div className="space-y-6">
              <TextField
                label="Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div>
                <Typography variant="subtitle1" gutterBottom>
                  Biography
                </Typography>
                <TextareaAutosize
                  minRows={4}
                  placeholder="Enter your bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  style={{
                    width: "100%",
                    marginTop: "8px",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardHeader
            title="Language"
            subheader="Choose your preferred language"
          />
          <CardContent>
            <RadioGroup defaultValue="en">
              <FormControlLabel
                value="en"
                control={<Radio />}
                label="English"
              />
              <FormControlLabel value="fr" control={<Radio />} label="French" />
              <FormControlLabel
                value="es"
                control={<Radio />}
                label="Spanish"
              />
            </RadioGroup>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardHeader
            title="Change Password"
            subheader="For your security, please do not share your password with others."
          />
          <CardContent>
            <div className="space-y-4">
              <TextField
                label="Current Password"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                label="New Password"
                type="password"
                fullWidth
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="pt-6">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
