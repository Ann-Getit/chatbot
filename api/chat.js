import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ reply: 'Method not allowed' });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ reply: 'Geen bericht ontvangen' });
  }

  const qaPath = path.join(process.cwd(), 'qa.json');
  const qa = JSON.parse(fs.readFileSync(qaPath, 'utf-8'));

  const input = message.toLowerCase().trim();
  let reply = qa.default;

  for (const intent of qa.intents) {
    if (intent.patterns.some(p => p.toLowerCase() === input)) {
      reply = intent.response;
      break;
    }
  }

  res.status(200).json({ reply });
}
