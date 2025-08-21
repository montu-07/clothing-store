import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db/db.js";

const JWT_SECRET = "supersecretkey"; // .env me rakho

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await db("users").where({ email }).first();
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const [userId] = await db("users").insert({ name, email, password: hashedPassword });

    res.json({ message: "User created successfully", userId });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db("users").where({ email }).first();
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1d" });

    res.json({ success: true, message: "Login successful", user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await db("users").where({ email }).first();
    if (!user) return res.status(400).json({ error: "User not found" });

    res.json({ message: "Password reset link sent to " + email });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
