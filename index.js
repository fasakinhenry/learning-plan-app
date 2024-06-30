const express = require('express');
const cors = require('cors');
const { sendEmail } = require('./notifications');
const plans = require('./data/plans');
const cron = require('node-cron');

const app = express();
app.use(cors());
app.use(express.json());

let startDate = null;
let email = null;

app.post('/api/start', (req, res) => {
  const { start, email: userEmail } = req.body;
  startDate = new Date(start);
  email = userEmail;
  res.sendStatus(200);
});

app.get('/api/plan', (req, res) => {
  if (!startDate) {
    return res.status(400).json({ message: 'Start date not set' });
  }
  const today = new Date();
  const diffTime = Math.abs(today - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const plan = plans.find((p) => p.day === diffDays);
  if (plan) {
    res.json(plan);
  } else {
    res.status(404).json({ message: 'Plan not found for the given day' });
  }
});

cron.schedule('0 9 * * *', () => {
  if (!startDate || !email) return;
  const today = new Date();
  const diffTime = Math.abs(today - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const plan = plans.find((p) => p.day === diffDays);
  if (plan) {
    const subject = 'Daily Learning Plan';
    sendEmail(email, subject, plan.task);
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
