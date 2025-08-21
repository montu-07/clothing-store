import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Grid,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice"; // ✅ dhyan do yaha correct path ho

// Apna logo aur illustration add kar
import logo from "../../images/logo.png";
import loginIllustration from "../../images/login-illustration.jpeg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { status, error } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();


    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      navigate("/"); // successful login hone ke baad home page
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f4ff, #f5c3f1ff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={10}
          sx={{
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          <Grid container>
            {/* Left Form Section */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                px: 6,
                py: 8,
                backgroundColor: "#fff",
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Box sx={{ textAlign: "center", mb: 3 }}>
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "100px", margin: "auto" }}
                  />
                </Box>

                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", mb: 1, textAlign: "center" }}
                >
                  POINT BREAK
                </Typography>
                <Typography
                  variant="body2"
                  color="black"
                  sx={{ mb: 4, textAlign: "center" }}
                >
                  Please login to continue
                </Typography>

                <form onSubmit={handleLogin}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    sx={{ mb: 3 }}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    sx={{ mb: 3 }}
                  />

                  {/* Error Message */}
                  {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                  )}

                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={status === "loading"}
                    sx={{
                      py: 1.2,
                      fontWeight: "bold",
                      borderRadius: 2,
                      background: "#ff4081",
                      "&:hover": {
                        background: "#e73370",
                      },
                    }}
                  >
                    {status === "loading" ? "Logging in..." : "Login"}
                  </Button>
                </form>

                <Box mt={2} sx={{ textAlign: "center" }}>
                  <Link
                    to="/forgot-password"
                    style={{ color: "#3f51b5", textDecoration: "none" }}
                  >
                    Forgot Password?
                  </Link>
                </Box>

                <Typography
                  variant="body2"
                  sx={{ mt: 2, textAlign: "center" }}
                >
                  Don’t have an account?{" "}
                  <Link
                    to="/signup"
                    style={{ color: "#3f51b5", textDecoration: "none" }}
                  >
                    Sign Up
                  </Link>
                </Typography>
              </motion.div>
            </Grid>

            {/* Right Illustration Section */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                background: "linear-gradient(135deg, #f0f4ff, #f5c3f1ff)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 4.739,
              }}
            >
              <motion.img
                src={loginIllustration}
                alt="Login Illustration"
                style={{ width: "100%", maxWidth: "480px" }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
