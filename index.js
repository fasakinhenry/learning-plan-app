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
  console.log('Received request:', req.body);
  const { email, day } = req.body;
  const plan = plans.find((p) => p.day === day);
  if (plan) {
    const subject = 'Daily Learning Plan';
    console.log('Sending email with message:', plan.message); // Debug log
    sendEmail(email, subject, plan.task);
    res.sendStatus(200);
  } else {
    res.status(404).json({ message: 'Plan not found for the given day' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
