import { Box, Typography, Button, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import fashionBanner from "../images/fashionBanner.jpg";
import heroImage from "../images/heroImage.jpg";
import { fetchProducts } from "../redux/slices/productSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";



const MotionTypography = motion(Typography);
const MotionButton = motion(Button);
const MotionBox = motion(Box);

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
  dispatch(fetchProducts());
}, [dispatch]);


  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: "100vh",
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.5)",
          }}
        />
        <MotionBox
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          sx={{
            zIndex: 1,
            color: "#fff",
            textAlign: "center",
            px: 4,
          }}
        >
          <MotionTypography
            variant="h3"
            fontWeight={700}
            gutterBottom
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            marginTop={20}
          >
            Discover Our Latest Collection
          </MotionTypography>
          <Typography variant="h6" gutterBottom>
            Fashion that speaks for you
          </Typography>
          <Button
            // key={index}
            component={Link}
            // to={`/${label.replace("&", "").replace(" ", "")}`}
            variant="contained"
            sx={{
              bgcolor: "#ff4081",
              color: "#fff",
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: "bold",
              transition: "all 0.3s",
              "&:hover": {

                bgcolor: "#ad1457",
                color: "#fff",
                transform: "scale(1.05)",
              },
            }}
          >
            SHOP
          </Button>
        </MotionBox>
      </Box>

      {/* Trending Section */}
      <Container sx={{ py: 10, bgcolor: "#f9f9f9", borderRadius: 3 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h4" textAlign="center" fontWeight="bold" gutterBottom
            sx={{ color: "#1e1e1e" }}
          >
            🔥 Trending Now
          </Typography>

          <Typography
            variant="subtitle1"
            textAlign="center"
            sx={{ maxWidth: 600, mx: "auto", color: "#555" }}
          >
            Handpicked styles to elevate your fashion game. Discover what's hot this season!
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              mt: 6,
              flexWrap: "wrap",
            }}
          >
            {["New Arrivals","Men", "Women","All"].map((label, index) => (
              <Button
                key={index}
                component={Link}
                to={`/${label.replace("&", "").replace(" ", "")}`}
                variant="contained"
                sx={{
                  bgcolor: "#000",
                  color: "#fff",
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: "bold",
                  transition: "all 0.3s",
                  "&:hover": {
                    bgcolor: "#ff4081",
                    transform: "scale(1.05)",
                  },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
        </motion.div>
      </Container>

      {/* Mood Section */}
      <motion.div
        initial={{ backgroundPositionY: "100%" }}
        whileInView={{ backgroundPositionY: "50%" }}
        transition={{ duration: 1.2 }}
      >
        <Box
          sx={{
            backgroundImage: `url(${fashionBanner})`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              backgroundColor: "rgba(255,255,255,0.7)",
              px: 4,
              py: 2,
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            Fashion is a language. Speak yours.
          </Typography>
        </Box>
      </motion.div>

      {/* Final CTA */}
      <Container
        maxWidth="md"
        sx={{
          py: 10,
          textAlign: "center",
          backgroundColor: "#fef4f7",
          borderRadius: 4,
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h4"
            gutterBottom
            fontWeight="bold"
            sx={{ color: "#0c0c0cff" }}
          >
            ✨ Ready to Redefine Your Look?
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ mb: 4, color: "#555" }}
          >
            Explore our collection and discover the perfect style for you.
          </Typography>

          <MotionButton
            component={Link}
            to="/All"
            variant="contained"
            size="large"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            sx={{
              backgroundColor:"#ff4081",
              color: "#fff",
              px: 5,
              py: 1.5,
              borderRadius: 3,
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#ad1457",
              },
            }}
          >
            Browse All Products
          </MotionButton>
        </motion.div>
      </Container>

    </Box>
  );
};

export default Home;
