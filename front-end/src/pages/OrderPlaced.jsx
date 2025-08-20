import { useLocation, Link } from "react-router-dom";
import { Box, Typography, Button, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function OrderPlaced() {
  const { state } = useLocation();
  const name = state?.name || "Customer";

  const { width, height } = useWindowSize();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        overflow: "hidden",
      }}
    >
      <Confetti width={width} height={height} recycle={false} numberOfPieces={300} />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Paper
          elevation={10}
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: "20px",
            bgcolor: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
            boxShadow: "0px 8px 30px rgba(0,0,0,0.2)",
          }}
        >
          <motion.div
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.7, type: "spring" }}
          >
            <CheckCircle2 size={90} color="#4caf50" style={{ marginBottom: 20 }} />
          </motion.div>

          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#000000ff", mb: 2 }}
          >
            Order Confirmed!
          </Typography>
          <Typography variant="h6" sx={{ mb: 4,color: "#e28aa7ff" }}>
            🎉 Thank you, <b>{name}</b>!  
            <br />Your order is on the way 🚚✨
          </Typography>

          <Button
            component={Link}
            to="/"
            variant="contained"
            sx={{
              bgcolor: "#ff4081",
              px: 4,
              py: 1.5,
              borderRadius: "12px",
              fontSize: "1rem",
              textTransform: "none",
              boxShadow: "0px 4px 15px rgba(76, 175, 80, 0.4)",
              "&:hover": { bgcolor: "#388e3c" },
            }}
          >
            Continue Shopping
          </Button>
        </Paper>
      </motion.div>
    </Box>
  );
}
