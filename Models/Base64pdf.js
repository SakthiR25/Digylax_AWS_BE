const mongoose = require('mongoose');

const basestringSchema = new mongoose.Schema({
  reference: String,
  createdDate: String,
  code: String,
  createdTime: String,
  poReference: String,
  supplierReference: String,
  filename: String,
  contentType: String,
  documentBody: String, 
  receivedDate: { type: Date, default: Date.now }, 
  receivedTime: { type: String, default: () => new Date().toLocaleTimeString() }, 
});

const Basestring = mongoose.model('Basestring', basestringSchema);

module.exports = Basestring;
