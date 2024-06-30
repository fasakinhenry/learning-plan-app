const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cron = require('node-cron');
const { sendEmail } = require('./notifications');
const Plan = require('./models/Plan');
const User = require('./models/User');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.get('/api/plan/:day', async (req, res) => {
  const day = parseInt(req.params.day);
  const plan = await Plan.findOne({ day });
  if (plan) {
    res.json(plan);
  } else {
    res.status(404).json({ message: 'Plan not found' });
  }
});

app.post('/api/register', async (req, res) => {
  const { email, startDate } = req.body;
  const user = new User({ email, startDate });
  await user.save();
  res.status(201).json({ message: 'User registered successfully' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Automated daily notifications
cron.schedule('0 8 * * *', async () => {
  // Sends notifications every day at 8 AM
  const users = await User.find({});
  users.forEach(async (user) => {
    const currentDate = new Date();
    const start = new Date(user.startDate);
    const diffTime = Math.abs(currentDate - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const plan = await Plan.findOne({ day: diffDays + 1 });

    if (plan) {
      const subject = 'Daily Learning Plan';
      const message = plan.task;
      sendEmail(user.email, subject, message);
    }
  });
});
