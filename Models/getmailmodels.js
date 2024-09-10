const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  subject: String,
  date: Date,
  fromEmail: String,
  toEmail: String,
  filefolder: String,
  attachments: [
    {
      filename: String,
      contentType: String,
      jsonfilename: String,
    }
  ],
  lineItems: [
    {
      description: String,
      quantity: Number,
      rate: Number,
      price: Number,
      discount: Number,
      subTotal: Number,
      taxAmount: Number,
      gst: Number,
    }
  ],
  vendorName: String,
  vendorAddress: String,
  invoiceNo: String,
  invoiceDate: Date,
  poNo: String,
  netTotal: Number,
});

const Email = mongoose.model('Emails', emailSchema);
