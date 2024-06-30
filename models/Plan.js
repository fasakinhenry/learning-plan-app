const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  day: { type: Number, required: true },
  task: { type: String, required: true },
});

module.exports = mongoose.model('Plan', planSchema);
