const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
exports.registerUser = (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, hashedPassword, role], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "User already exists or error occurred", error: err });
    }
    return res.status(201).json({ message: "User registered successfully" });
  });
};

// Login User
exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  });
};

// Get All Users (optional)
exports.getAllUsers = (req, res) => {
  db.query("SELECT id, name, email, role FROM users", (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching users" });
    res.status(200).json(results);
  });
};
