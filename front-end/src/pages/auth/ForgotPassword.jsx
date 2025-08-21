import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/slices/authSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleForgot = async (e) => {
    e.preventDefault();
    await dispatch(forgotPassword({ email }));
    alert("Password reset link sent to your email");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgot}>
        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: "100%", marginBottom: "10px", padding: "10px" }} />
        <button type="submit" style={{ width: "100%", padding: "10px", background: "#ff4081", color: "#fff", border: "none" }}>Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
