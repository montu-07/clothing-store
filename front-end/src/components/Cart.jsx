import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/slices/cartSlice";
import { Box, Typography, Button, IconButton, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Add, Remove, Delete } from "@mui/icons-material";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const handleQuantity = (id, type) => {
    dispatch(updateQuantity({ id, type }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <Box sx={{ maxWidth: "900px", mx: "auto", mt: 5, p: 3, bgcolor: "#f4f3e3ff", borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#222" }}>
        🛒 Your Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          Your cart is empty.
        </Typography>
      ) : (
        <>
          {cart.map((item) => (
            <Box
              key={item.id}
              sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2, p: 2, borderRadius: 2, bgcolor: "#f9f9f9" }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <img src={item.image} alt={item.name} width={70} style={{ borderRadius: 8 }} />
                <Box>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body2" color="textSecondary">₹{item.price}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton onClick={() => handleQuantity(item.id, "decrease")} disabled={item.quantity <= 1}>
                  <Remove />
                </IconButton>
                <Typography>{item.quantity}</Typography>
                <IconButton onClick={() => handleQuantity(item.id, "increase")}>
                  <Add />
                </IconButton>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography variant="h6">₹{item.price * item.quantity}</Typography>
                <IconButton color="error" onClick={() => handleRemove(item.id)}>
                  <Delete />
                </IconButton>
              </Box>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h5" fontWeight="bold">
              Total: ₹{total}
            </Typography>
            <Button variant="contained" sx={{backgroundColor:"#ff4081"}} size="large" onClick={() => nav("/checkout")}>
              Proceed to Checkout
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Cart;
