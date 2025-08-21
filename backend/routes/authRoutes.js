// routes/authRoutes.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db/db.js";

const router = express.Router();
const JWT_SECRET = "supersecretkey"; // ✅ use .env in real apps

// =================== SIGNUP ===================
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await db("users").where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [userId] = await db("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    res.json({ message: "User created successfully", userId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// =================== LOGIN ===================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await db("users").where({ email }).first();
    if (!user) return res.status(400).json({ error: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1d" });

    res.json({
      success: true,
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// =================== FORGOT PASSWORD ===================
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await db("users").where({ email }).first();
    if (!user) return res.status(400).json({ error: "User not found" });

    // ⚡ Normally you’d send an email with reset token
    res.json({ message: "Password reset link sent to " + email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
