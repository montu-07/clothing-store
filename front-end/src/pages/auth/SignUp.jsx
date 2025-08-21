import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../../redux/slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Logo from "../../images/logo.png"; // apna logo yahan import karo

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await dispatch(signupUser({ name, email, password }));
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#000", // black premium background
        padding: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: 420,
          p: 4,
          borderRadius: 4,
          textAlign: "center",
          background: "#111",
          color: "#fff",
        }}
      >
        {/* Logo */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <img
            src={Logo}
            alt="POINT BREAK LOGO"
            style={{
              width: "120px",
              marginBottom: "10px",
            }}
          />
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", letterSpacing: 1 }}
          >
            Create an Account
          </Typography>
        </Box>

        <form onSubmit={handleSignup}>
          <TextField
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            margin="normal"
            variant="outlined"
            InputLabelProps={{ style: { color: "#bbb" } }}
            InputProps={{
              style: { color: "#fff" },
            }}
          />
          <TextField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
            variant="outlined"
            InputLabelProps={{ style: { color: "#bbb" } }}
            InputProps={{
              style: { color: "#fff" },
            }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
            variant="outlined"
            InputLabelProps={{ style: { color: "#bbb" } }}
            InputProps={{
              style: { color: "#fff" },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: "bold",
              borderRadius: 2,
              fontSize: "16px",
              background: "linear-gradient(90deg, #fff, #999)",
              color: "#000",
              "&:hover": {
                background: "linear-gradient(90deg, #ddd, #666)",
              },
            }}
          >
            Sign Up
          </Button>
        </form>

        {/* Login link */}
        <Typography variant="body2" sx={{ mt: 3, color: "#aaa" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: "#fff", textDecoration: "underline" }}
          >
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;
