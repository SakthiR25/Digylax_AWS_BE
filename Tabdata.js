

// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const app = express();

// // const port = 8083;
// const port = process.env.PORT || 8083;




// app.use(bodyParser.json());

// // MY CORS middleware
// app.use(cors({
//     origin: 'http://localhost:3000', 
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     optionsSuccessStatus: 204,
//     allowedHeaders: 'Content-Type,Authorization',
// }));

// if (mongoose.connection.readyState === 0) {
//   mongoose.connect('mongodb+srv://sakthivel:sakthi@cluster0.dconihp.mongodb.net/Tabdatas', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// }

// const tableDataSchema = new mongoose.Schema({
//   VendorName: String,
//   VendorAddress: String,  
//   InvoiceNo: String,
//   InvoiceDate: String,  
//   Qty: String,
//   Rate: String,
//   Price: String,
//   Discount: String,
//   SubTotal: String,
//   TaxAmount: String,
//   Gst: String,
//   NetTotal: String,
//   PoNo: String,
//   Description: String,
// });

// const TableData = mongoose.model('TableData', tableDataSchema);



// app.post('/Tabdata', async (req, res) => {
//   try {
//     const receivedData = req.body;

//     const modifiedData = receivedData.map(item => ({
//       Id: String, 
//       VendorName: item.propertyName,
//       VendorAddress: item.vendorAddress,
//       InvoiceNo: item.invoiceNumber,
//       InvoiceDate: item.invoiceDate,
//       Qty: item.qty,
//       Rate: item.rate,
//       Price: item.amount,
//       Discount: item.discount,
//       SubTotal: item.total,
//       TaxAmount: item.tax,
//       Gst: item.gst,
//       NetTotal: item.netAmount,
//       PoNo: item.PoNumber,
//       Description: item.Description,
//     }));

//     console.log('Modified Data:', modifiedData);

//     const newData = await TableData.insertMany(modifiedData);

//     console.log('Data received and saved on the server:', newData);
//     res.status(200).json({ message: 'Data received and saved successfully.', data: newData });
//   } catch (error) {
//     console.error('Error handling POST request:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.get('/Tabdata', async (req, res) => {
//     try {
//       const data = await TableData.find();
  
//       res.status(200).json(data);
//     } catch (error) {
//       console.error('Error handling GET request:', error);  
//       res.status(500).json({ error: 'Internal server error' });
//     }
// });



// app.delete('/api/tabledata/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ error: 'Invalid ObjectId' });
//     }

//     const result = await TableData.findByIdAndDelete(id);

//     if (!result) {
//       return res.status(404).json({ error: 'Document not found' });
//     }

//     res.json({ message: 'Document deleted successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });



// app.listen(port, () => {
//   // console.log(`Server is running on http://localhost:${port}`);
// });













const express = require('express');
const mongoose = require('mongoose');

// Initialize the app
const router = express.Router();

// Define the schema and model
const tableDataSchema = new mongoose.Schema({
  VendorName: String,
  VendorAddress: String,  
  InvoiceNo: String,
  InvoiceDate: String,  
  Qty: String,
  Rate: String,
  Price: String,
  Discount: String,
  SubTotal: String,
  TaxAmount: String,
  Gst: String,
  NetTotal: String,
  PoNo: String,
  Description: String,
});

const TableData = mongoose.model('TableData', tableDataSchema);

// POST endpoint to handle data insertion
router.post('/Tabdata', async (req, res) => {
  try {
    const receivedData = req.body;

    // Ensure that receivedData is an array
    if (!Array.isArray(receivedData)) {
      return res.status(400).json({ error: 'Invalid data format' });
    }

    const modifiedData = receivedData.map(item => ({
      VendorName: item.propertyName,
      VendorAddress: item.vendorAddress,
      InvoiceNo: item.invoiceNumber,
      InvoiceDate: item.invoiceDate,
      Qty: item.qty,
      Rate: item.rate,
      Price: item.amount,
      Discount: item.discount,
      SubTotal: item.total,
      TaxAmount: item.tax,
      Gst: item.gst,
      NetTotal: item.netAmount,
      PoNo: item.PoNumber,
      Description: item.Description,
    }));

    console.log('Modified Data:', modifiedData);

    const newData = await TableData.insertMany(modifiedData);

    console.log('Data received and saved on the server:', newData);
    res.status(200).json({ message: 'Data received and saved successfully.', data: newData });
  } catch (error) {
    console.error('Error handling POST request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET endpoint to retrieve all data
router.get('/Tabdata', async (req, res) => {
  try {
    const data = await TableData.find();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error handling GET request:', error);  
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE endpoint to remove a document by id
router.delete('/api/tabledata/:id', async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ObjectId' });
    }

    const result = await TableData.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Error handling DELETE request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Export the app for use in other modules
module.exports = router;
