const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Book Appointment
router.post('/book', (req, res) => {
  const { Username, phone, date, time, doctor } = req.body;

  if (!Username || !phone || !date || !time || !doctor) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = `INSERT INTO appointments (Username, phone, date, time, doctor) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [Username, phone, date, time, doctor], (err, result) => {
    if (err) {
      console.error('Error booking appointment:', err);
      return res.status(500).json({ error: 'Failed to book appointment' });
    }

    res.status(200).json({ message: 'Appointment booked successfully', id: result.insertId });
  });
});

// Get Appointment by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM appointments WHERE id = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching appointment:', err);
      return res.status(500).json({ error: 'Failed to get appointment' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json(results[0]);
  });
});

// Cancel Appointment
router.delete('/cancel/:id', (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM appointments WHERE id = ?`;
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Cancel Error:", err);
      return res.status(500).json({ error: "Failed to cancel appointment" });
    }

    res.json({ message: 'Appointment cancelled successfully' });
  });
});

module.exports = router;
