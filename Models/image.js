const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalname: { type: String, required: true },
  path: { type: String, required: true },
  data: { type: String, required: true },
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
