// server.js
const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5500;
const fs = require('fs');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');

app.use(express.json());

app.use(cors({
  origin: ['http://127.0.0.1:5502', 'http://127.0.0.1:5500'],
  credentials: true,
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



// MySQL connectie (als je die wilt gebruiken)
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
console.log('DB_USER:', process.env.DB_USER);

db.connect(err => {
  if (err) {
    console.error('❌ MySQL connection failed:', err);
    process.exit(1);
  }
  console.log('✅ Connected to MySQL!');
});


// errorHandler.js
function handleDbError(res, err, message = 'Database error') {
  console.error('❌ DB ERROR:', err); // log op server
  res.status(500).json({ error: message }); // naar frontend, geen details
}

const qa = JSON.parse(fs.readFileSync('./qa.json', 'utf-8'));


app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) return handleDbError(res, err);
      res.json({ message: 'User registered', userId: result.insertId });
    });
  } catch (err) {
    console.error('❌ Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});




app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
         console.error("❌ DB error:", err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      console.log("❌ Geen user gevonden met email:", email);
      return res.status(401).json({ error: 'User not found' });
    }

    
    const user = results[0];
    // check password (bcrypt.compare)
    const valid = await bcrypt.compare(password, user.password); // tijdelijk, voor dev
    if (!valid) return res.status(401).json({ error: 'Invalid password' });

    res.json({ userId: user.id });
  });
});


app.post('/api/chat', (req, res) => {
  const { message, userId } = req.body;
  if (!userId) return res.status(400).json({ error: 'No userId provided' });

  console.log("User zei:", message);

  // maak lowercase voor simpele matching
const userInput = message.toLowerCase().trim();
let reply = qa.default;

for (const intent of qa.intents) {
  if (intent.patterns.some(pattern => pattern.toLowerCase() === userInput)) {
    reply = intent.response;
    break;
  }
}
console.log("Bot zegt:", reply);
//const botReply = qa[userInput] || qa["default"];


// maak de message objecten aan
  const newMessageUser = {
    sender: 'user',
    message,
    created_at: new Date().toISOString()
  };
  const newMessageBot = {
    sender: 'bot',
    message: reply,
    created_at: new Date().toISOString()
  };

// chat log opslaan in MySQL
  const sql = `
  UPDATE users
  SET chat_history = JSON_ARRAY_APPEND(
        IFNULL(chat_history, JSON_ARRAY()),
        '$',
        JSON_OBJECT('sender', ?, 'message', ?, 'created_at', ?)
      ),
      last_message = ?,
      last_bot_response = ?
  WHERE id = ?`;



  db.query(sql, [
  newMessageUser.sender,
  newMessageUser.message,
  newMessageUser.created_at,
  newMessageUser.message,
  newMessageBot.message,
  userId
], (err) => {
  if (err) return handleDbError(res, err); 
  
  // stuur reactie terug naar frontend
  res.json({ reply });
 });
});



app.listen(PORT, () => {
    console.log(`🚀 Listening on :${PORT} ✅`);
    });
