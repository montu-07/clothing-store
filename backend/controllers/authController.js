import * as authService from "../services/authService.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const userId = await authService.createUser({ name, email, password });
    return res.json({ message: "User created successfully", userId });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const { user, token } = await authService.loginUser({ email, password });
    return res.json({
      success: true,
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const user = await db("users").where({ email }).first();
    if (!user) return res.status(404).json({ error: "User not found" });

    // 🔹 Here you’d send an actual email in production
    return res.json({ message: `Password reset link sent to ${email}` });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
};
