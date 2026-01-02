// server.js
/*const express = require('express');
const app = express();
const PORT = 5500;
const fs = require('fs');
const cors = require('cors');
app.use(express.static('public'));

app.use(express.json());

app.use(cors({
  origin: ['http://127.0.0.1:5502', 'http://127.0.0.1:5500'],
  credentials: true,
}));

const qa = JSON.parse(fs.readFileSync('./qa.json', 'utf-8'));


app.post('/api/chat', (req, res) => {
  console.log('--- POST /api/chat ontvangen ---');
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);

  const { message } = req.body;
  if (!message) return res.status(400).json({ reply: 'Geen bericht ontvangen' });


  // maak lowercase voor simpele matching
 const input = message.toLowerCase().trim();
 let reply = qa.default;

for (const intent of qa.intents) {
  if (intent.patterns.some(p => p.toLowerCase() === input)) {
    reply = intent.response;
    break;
  }
}

console.log('Bot zegt:', reply);
  // stuur reactie terug naar frontend
  res.json({ reply });
 });



app.listen(PORT, () => {
    console.log(`🚀 Listening on :${PORT} ✅`);
    });*/
