// src/pages/Checkout.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Stepper from "./Stepper";
import { TextField } from "@mui/material";

const Checkout = ({ total }) => {
  const cart = useSelector((state) => state.cart); // same as Cart.jsx
  const navigate = useNavigate();

  const [payment, setPayment] = useState("cod");
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const shipping = subtotal > 1000 ? 0 : 99;
  const totalprice = subtotal + shipping;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (validateForm()) {
      navigate("/order-placed");
    }
  };


  return (
    <div style={{ maxWidth: "1200px", margin: "40px auto", padding: "20px" }}>
      {/* Progress Header */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
        {/* {["Cart", "Checkout", "Order Placed"].map((step, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              fontWeight: idx === 1 ? "bold" : "normal",
              color: idx === 1 ? "#000000ff" : "#666",
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: idx <= 1 ? "#ff4081" : "#ccc",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 8,
                fontSize: 14,
              }}
            >
              {idx + 1}
            </div>
            {step}
            {idx < 2 && <div style={{ width: 50, height: 2, background: "#ddd", margin: "0 15px" }} />}
          </div>
        ))} */}

        <Stepper />

      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "30px" }}>
        {/* Billing Form */}
        <div
          style={{
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            background: "#fff",
          }}
        >
          <h3 style={{ marginBottom: "20px", color: "#000000ff" }}>Billing Details :</h3>
          <form style={{ display: "grid", gap: "10px" }}>
            <TextField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name}
            />

            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email}
            />

            <TextField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={!!errors.phone}
              helperText={errors.phone}
            />

            <TextField
              label="Shipping Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
              error={!!errors.address}
              helperText={errors.address}
            />

          </form>

          {/* Payment Options */}
          <h3 style={{ margin: "25px 0 15px", color: "#222" }}>Payment Method</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <label style={radioStyle}>
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={payment === "cod"}
                onChange={() => setPayment("cod")}
              />
              Cash on Delivery
            </label>
            <label style={radioStyle}>
              <input
                type="radio"
                name="payment"
                value="upi"
                checked={payment === "upi"}
                onChange={() => setPayment("upi")}
              />
              UPI / Wallet
            </label>
            <label style={radioStyle}>
              <input
                type="radio"
                name="payment"
                value="card"
                checked={payment === "card"}
                onChange={() => setPayment("card")}
              />
              Credit / Debit Card
            </label>
          </div>
        </div>

        {/* Order Summary */}
        <div
          style={{
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            background: "#fff",
            position: "sticky",
            top: "20px",
          }}
        >
          <h3 style={{ marginBottom: "20px", color: "#222" }}>Order Summary</h3>

          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "12px",
                color: "#444",
              }}
            >
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          <hr style={{ margin: "15px 0" }} />

          <div style={summaryRow}>
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div style={summaryRow}>
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
          </div>

          <div style={{ ...summaryRow, fontWeight: "bold", fontSize: "18px", marginTop: "15px" }}>
            <span>Total</span>
            <span>₹{totalprice}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            style={{
              marginTop: "25px",
              width: "100%",
              padding: "16px",
              background: "#ff4081",
              color: "#000000ff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "17px",
              fontWeight: "bold",
              transition: "0.3s",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
            onMouseOver={(e) => (e.target.style.background = "#ff4081")}
            onMouseOut={(e) => (e.target.style.background = "#ff4081")}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "14px",
  outline: "none",
  transition: "0.2s",
};
inputStyle[":focus"] = { border: "1px solid #ff4081" };

const radioStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "15px",
  cursor: "pointer",
  color: "#333",
};

const summaryRow = {
  display: "flex",
  justifyContent: "space-between",
  margin: "8px 0",
};

export default Checkout;
