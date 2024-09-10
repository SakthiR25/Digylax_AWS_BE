// const mongoose = require('mongoose');

// const InvoiceLayoutSchema = new mongoose.Schema({

//     InvoiceNo: { type: String, required: true },
//     InvoiceDate: { type: Date, required: true },
//     PoNo: { type: String, required: true },
//     PoDate: { type: Date, required: true },
//     Description: { type: String, required: true },
//     Quantity: { type: Number, required: true },
//     Unitprice: { type: Number, required: true },
//     Total: { type: Number, required: true },
//     Discount: { type: Number, required: true },
//     SubTotal: { type: Number, required: true },
//     Gst: { type: Number, required: true },
//     Tax: { type: Number, required: true },
//     NetAmount: { type: Number, required: true },
//     Remarks: { type: String, required: true }
// }); 

// const InvoiceLayout = mongoose.model('InvoiceLayout', InvoiceLayoutSchema);

// module.exports = { 
//     InvoiceLayout 

// };







// ./Models/InvoiceLayout.js
const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    InvoiceNo: String,
    InvoiceDate: Date,
    PoNo: String,
    PoDate: Date,
    Description: String,
    Quantity: Number,
    Unitprice: Number,
    Total: Number,
    Discount: Number,
    SubTotal: Number,
    Gst: Number,
    Tax: Number,
    NetAmount: Number,
    Remarks: String,
});

const InvoiceLayout = mongoose.model('InvoiceLayout', invoiceSchema);

module.exports = { InvoiceLayout };
