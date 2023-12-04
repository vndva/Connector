const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());

app.all('/ccpayment', async (req, res) => {
  if (req.method === 'POST' && req.query) {
    const {
      bots,
      command,
      public_user_token,
      user_id
    } = req.query
    
    try {
      const WEBHOOK_URL = `https://api.bots.business/v1/bots/${bots}/new-webhook?command=${command}&public_user_token=${public_user_token}&user_id=${user_id}`;
      
      await axios.post(WEBHOOK_URL, req.body || null);
      console.log('Connecting....');
    } catch (e) {}
  }
  
  res.status(200).send("Success");
});

app.all('*', (req, res) => {
  res.status(200).json({ ok: true });
});

app.listen(3000, () => console.log('Listen to port 3000...'));