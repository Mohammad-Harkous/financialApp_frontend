import React, { useState } from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function MyForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting form...", { name, email, password });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        bgcolor: "#264ECA",
      }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backfaceVisibility: "1ss0",
          p: 3,
          borderRadius: 3,
        }}>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{ boxSizing: "content-box" }}
            required
            label="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            sx={{ backgroundColor: "white" }}
            required
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            sx={{ backgroundColor: "white" }}
            required
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}>
            <Button
              sx={{
                backgroundColor: "white",
                zIndex: "1",
                "&:hover": { backgroundColor: "white" },
              }}
              type="submit"
              variant="outlined"
              color="primary"
              size="large">
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default MyForm;
