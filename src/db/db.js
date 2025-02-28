const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "test",
});

const app = express();
app.use(bodyParser.json());

app.get("/db", (req, res) => {
  const sql = "SELECT * FROM profiles";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.get("/api/profiles/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM profiles WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ error: "Profile not found" });
    res.json(results[0]);
  });
});
