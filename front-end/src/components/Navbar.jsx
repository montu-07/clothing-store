import React from "react";
import { AppBar, Toolbar, Typography, Box, IconButton, Badge } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";

const MotionButton = motion(Link);

const Navbar = () => {
  const isAdmin = true; // Set to false to simulate a normal user
  const cart = useSelector((state) => state.cart); // from redux

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "New Arrivals", path: "/NewArrivals" },
    { label: "All", path: "/All" },
    { label: "Men", path: "/Men" },
    { label: "Women", path: "/Women" },
  ];

  if (isAdmin) {
    navLinks.push({ label: "Admin Panel", path: "/admin" });
  }

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "#ff4081",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        zIndex: 10,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 3 }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
            color: "#000",
            textDecoration: "none",   // 🔹 removes underline
            whiteSpace: "nowrap",     // 🔹 prevents breaking into two lines
            overflow: "hidden",
            textOverflow: "ellipsis", // 🔹 shows "..." if text is too long
          }}
        >
          POINT BREAK
        </Typography>

        <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
          {navLinks.map((nav, index) => (
            <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Typography
                component={Link}
                to={nav.path}
                sx={{
                  color: "#000",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  "&:hover": {
                    color: "#fff",
                  },
                }}
              >
                {nav.label}
              </Typography>
            </motion.div>
          ))}

          {/* Cart Icon with Badge */}
          <IconButton component={Link} to="/Cart">
            <Badge
              badgeContent={cart.reduce((sum, item) => sum + item.quantity, 0)} // total quantity
              color="secondary"
            >
              <ShoppingCartIcon sx={{ color: "#000" }} />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
