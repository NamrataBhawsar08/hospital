const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = "your_jwt_secret_key";

// Register user
exports.register = (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, hashedPassword, role], (err, result) => {
    if (err) return res.status(500).json({ message: "Email already in use" });
    res.status(201).json({ message: "User registered successfully" });
  });
};

// Login user
exports.login = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ message: "Invalid credentials" });

    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: "1d" });
    res.json({ message: "Login successful", token, user });
  });
};
