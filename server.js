const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.get('/verify', (req, res) => {
  const userId = req.query.user;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  if (!userId) return res.status(400).send('Missing user ID');

  // Log IPs to file (or send to DB or bot)
  const logEntry = `[${new Date().toISOString()}] User: ${userId}, IP: ${ip}\n`;
  fs.appendFileSync(path.join(__dirname, 'ip-log.txt'), logEntry);

  res.send(`
    <html>
    <head><title>Verification</title></head>
    <body style="font-family: sans-serif; text-align: center; margin-top: 100px;">
      <h2>Aro Verification</h2>
      <p>Discord ID: ${userId}</p>
      <p>Your IP has been logged successfully.</p>
      <p>You can now return to Discord.</p>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
