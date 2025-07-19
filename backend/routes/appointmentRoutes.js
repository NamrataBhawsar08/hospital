// Assuming you're using Express and MySQL
const express = require('express');
const router = express.Router();
const db = require('../db'); // your MySQL connection

router.post('/book', (req, res) => {
  const { Username, doctorName, date, time, reason } = req.body;

  const sql = 'INSERT INTO appointments (Username, doctorName, date, time, reason) VALUES (?, ?, ?, ?, ?)';
  const values = [Username, doctorName, date, time, reason];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting appointment:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    
    res.status(200).json({
      message: 'Appointment booked successfully',
      appointmentId: result.insertId, // 
    });
  });
});
// DELETE route to cancel appointment
app.delete('/api/appointments/cancel/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM appointments WHERE id = ?';
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Delete error:", err);
      return res.status(500).json({ message: "Failed to cancel" });
    }
    res.status(200).json({ message: "Appointment cancelled successfully" });
  });
});

module.exports = router;
