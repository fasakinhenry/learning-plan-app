// index.js
const express = require('express');
const cors = require('cors');
const { sendEmail } = require('./notifications');
const plans = require('./data/plans');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/plan/:day', (req, res) => {
  const day = parseInt(req.params.day);
  const plan = plans.find((p) => p.day === day);
  if (plan) {
    res.json(plan);
  } else {
    res.status(404).json({ message: 'Plan not found' });
  }
});

app.post('/api/notify', (req, res) => {
  const { email, message } = req.body;
  const subject = 'Daily Learning Plan';
  sendEmail(email, subject, message);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
