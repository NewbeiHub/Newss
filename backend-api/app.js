const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors")



const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "se_db",
});

const app = express();
app.use(bodyParser.json());
app.use(cors())



//Get all profile
app.get("/api/db", (req, res) => {
  const sql = "SELECT * FROM news";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//Get profiles By id

// app.get("/api/db/:news_id", (req, res) => {
//   const { news_id } = req.params;
//   const sql = "SELECT * FROM news WHERE news_id = ?";
//   db.query(sql, [news_id], (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     if (results.length === 0)
//       return res.status(404).json({ error: "db not found" });
//     res.json(results[0]);
//   });
// });

app.get("/api/db/:news_id", (req, res) => {
  const { news_id } = req.params;

  // ตรวจสอบว่า news_id มีค่าถูกต้อง
  if (!news_id || isNaN(news_id)) {
    return res.status(400).json({ error: "Invalid news_id" });
  }

  const sql = "SELECT * FROM news WHERE news_id = ?";
  db.query(sql, [news_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ error: "db not found" });
    res.json(results[0]);
  });
});






app.post("/api/db", (req, res) => {
  const { user_id, news_name, news_type, news_from, news_date_start, news_date_end, news_img, news_detail, news_url, created_at, updated_at } = req.body;
  const sql = "INSERT INTO news (user_id, news_name, news_type, news_from, news_date_start, news_date_end, news_img, news_detail, news_url, created_at, updated_at)  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [user_id, news_name, news_type, news_from, news_date_start, news_date_end, news_img, news_detail, news_url, created_at, updated_at], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, user_id, news_name, news_type, news_from, news_date_start, news_date_end, news_img, news_detail, news_url, created_at, updated_at });
  });
});

app.put("/api/db/:news_id", (req, res) => {
  const { news_id } = req.params;
  const { user_id, news_name, news_type, news_from, news_date_start, news_date_end, news_img, news_detail, news_url, created_at, updated_at } = req.body;
  const sql = "UPDATE news SET user_id = ?, news_name = ?, news_type = ?, news_from = ?, news_date_start = ?, news_date_end = ?, news_img = ?, news_detail = ?, news_url = ?, created_at = ?, updated_at = ? WHERE news_id = ?";
  db.query(sql, [user_id, news_name, news_type, news_from, news_date_start, news_date_end, news_img, news_detail, news_url, created_at, updated_at, news_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "bd not found" });
    res.json({ message: "bd updated successfully" });
  });
});


app.delete("/api/db/:news_id", (req, res) => {
  const { news_id } = req.params;
  const sql = "DELETE FROM news WHERE news_id = ?";
  db.query(sql, [news_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "bd not found" });
    res.json({ message: "bd deleted successfully" });
  });
});

// const express = require("express");
// const mysql = require("mysql2");
// const bodyParser = require("body-parser");
// const cors = require("cors")
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");


// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "se_db",
// });

// const app = express();
// app.use(bodyParser.json());
// app.use(cors())

// //Get all profile
// app.get("/api/db", (req, res) => {
//   const sql = "SELECT * FROM news";
//   db.query(sql, (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(results);
//   });
// });

// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

// //Get profiles By id
// app.get("/api/db/:id", (req, res) => {
//   const { id } = req.params;
//   const sql = "SELECT * FROM news WHERE news_id = ?";
//   db.query(sql, [id], (err, results) => {
//     if (err) return res.status(500).json({ error: err.message });
//     if (results.length === 0)
//       return res.status(404).json({ error: "db not found" });
//     res.json(results[0]);
//   });
// });


// app.post("/api/db", (req, res) => {
//   const { user_id, news_name, news_type, news_from, news_date_start, news_date_end, news_img, news_detail, news_url, created_at, updated_at } = req.body;
//   const sql = "INSERT INTO news (user_id, news_name, news_type, news_from, news_date_start, news_date_end, news_img, news_detail, news_url, created_at, updated_at)  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
//   db.query(sql, [user_id, news_name, news_type, news_from, news_date_start, news_date_end, news_img, news_detail, news_url, created_at, updated_at], (err, result) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.status(201).json({ id: result.insertId, user_id, news_name, news_type, news_from, news_date_start, news_date_end, news_img, news_detail, news_url, created_at, updated_at });
//   });
// });

// // app.put("/api/db/:id", (req, res) => {
// //   const { news_id } = req.params;
// //   const { user_id, news_name, news_type, news_from, news_date_start, news_date_end, news_img, news_detail, news_url, created_at, updated_at } = req.body;
// //   const sql = "UPDATE news SET user_id = ?, news_name = ?, news_type = ?, news_from = ?, news_date_start = ?, news_date_end = ?, news_img = ?, news_detail = ?, news_url = ?, created_at = ?, updated_at = ? WHERE news_id = ?";
// //   db.query(sql, [user_id, news_name, news_type, news_from, news_date_start, news_date_end, news_img, news_detail, news_url, created_at, updated_at, news_id], (err, result) => {
// //     if (err) return res.status(500).json({ error: err.message });
// //     if (result.affectedRows === 0)
// //       return res.status(404).json({ error: "bd not found" });
// //     res.json({ message: "bd updated successfully" });
// //   });
// // });


// // app.delete("/api/db/:id", (req, res) => {
// //   const { news_id } = req.params;
// //   const sql = "DELETE FROM news WHERE news_id = ?";
// //   db.query(sql, [news_id], (err, result) => {
// //     if (err) return res.status(500).json({ error: err.message });
// //     if (result.affectedRows === 0)
// //       return res.status(404).json({ error: "bd not found" });
// //     res.json({ message: "bd deleted successfully" });
// //   });
// // });
