const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db"); // your MySQL connection

const JWT_SECRET = "your_jwt_secret"; // replace with your env variable in production

// --------------------- SIGNUP ---------------------
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    // Check if email or username already exists
    const [existingEmail] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingEmail.length > 0)
      return res.status(400).json({ message: "Email already registered" });

    const [existingUsername] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
    if (existingUsername.length > 0)
      return res.status(400).json({ message: "Username already taken" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await pool.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    // Create token
    const token = jwt.sign({ id: result.insertId }, JWT_SECRET, { expiresIn: "1h" });

    // Respond with token and username
    res.status(201).json({
      message: "User created successfully",
      token,
      username,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// --------------------- LOGIN ---------------------
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, username]
    );
    if (rows.length === 0) return res.status(400).json({ message: "User not found" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

    // Return token and username
    res.json({
      token,
      username: user.username,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
