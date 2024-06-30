const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Plan = require('./models/Plan');

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

const plans = [
  { day: 1, task: 'HTML basics: Create a basic HTML page.' },
  { day: 2, task: 'HTML forms and media elements: Create a contact form.' },
  // Add more plans here...
];

Plan.insertMany(plans)
  .then(() => {
    console.log('Plans inserted');
    mongoose.connection.close();
  })
  .catch((err) => console.error(err));
