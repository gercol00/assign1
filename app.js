const express = require("express");
const mysql = require("mysql2")

const app = express();

const pool = mysql.createPool({
  host: "localhost",
  user: "csce41333user",
  password: "csce41333pass",
  database: "assign1",
  connectionLimit: 5,
});

const db = pool;

//*** Middleware */
app.use(express.json());
app.use(express.static('public'));

//** Web API */
app.get("/users", function (req, res) {
  const sql = "SELECT * FROM users";


  pool.execute(sql, function (err, result, fields) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(result);
  });
});

app.post("/users", function (req, res) {
  const username = req.body.username;
  const lastname = req.body.lastname;
  const firstname = req.body.firstname;
  const passwd = req.body.passwd;
  const email = req.body.email;
  const urole = req.body.urole;

  if(!username) { 
    res.status(400).json({ error: "Username is required" });
    return;
  }
  
  const sql = "INSERT INTO users (username, lastname, firstname, passwd, email, urole) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [username, lastname, firstname, passwd, email, urole];

  pool.execute(sql, values, function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(201).json({ message: "User created successfully", userId: result.insertId });
  });
});


app.listen(3000, function () {
  console.log("Listening on port 3000..");
});
