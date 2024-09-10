// const express = require('express');
// const cors = require('cors');
// const http = require('http');
// const { Server } = require('socket.io');
// const connectDB = require('./Db/db');
// const Basestring = require('./Models/Base64pdf');

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// // const PORT = 2026; 
// const PORT = process.env.PORT || 2026;


// connectDB();

// app.use(cors());
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));

// app.post('/upload', async (req, res) => {
//   try {
//     const {
//       reference,
//       createdDate,
//       code,
//       createdTime,
//       poReference,
//       supplierReference,
//       invoiceDocument,
//     } = req.body;

//     if (!invoiceDocument || !invoiceDocument.documentbody) {
//       return res.status(400).json({ message: 'No document provided' });
//     }

//     const newBasestring = new Basestring({
//       reference,
//       createdDate,
//       code,
//       createdTime,
//       poReference,
//       supplierReference,
//       filename: invoiceDocument.filename,
//       contentType: invoiceDocument.type,
//       documentBody: invoiceDocument.documentbody,
//     });

//     await newBasestring.save();

//     io.emit('new-file', newBasestring);

//     res.status(200).json({ message: 'Data stored successfully', data: newBasestring });
//   } catch (error) {
//     console.error('Error during data processing:', error);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// });

// // Document retrieval by ID
// app.get('/document/:id', async (req, res) => {
//   try {
//     const document = await Basestring.findById(req.params.id);
//     if (!document) {
//       return res.status(404).json({ message: 'Document not found' });
//     }

//     res.setHeader('Content-Type', document.contentType);
//     res.setHeader('Content-Disposition', `attachment; filename=${document.filename}`);

//     const binaryData = Buffer.from(document.documentBody, 'base64');
//     res.send(binaryData);
//   } catch (error) {
//     console.error('Error during document retrieval:', error);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// });

// // Get all files route
// app.get('/files', async (req, res) => {
//   try {
//     const files = await Basestring.find();
//     res.status(200).json({ message: 'Files retrieved successfully', data: files });
//   } catch (error) {
//     console.error('Error retrieving files:', error);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// });

// // Start the server
// server.listen(PORT, () => {
//   // console.log(`Server is running on port ${PORT}`);
// });

// module.exports = { io };








const express = require('express');
const Basestring = require('./Models/Base64pdf');

const router = express.Router();

router.post('/upload', async (req, res) => {
  try {
    const {
      reference,
      createdDate,
      code,
      createdTime,
      poReference,
      supplierReference,
      invoiceDocument,
    } = req.body;

    if (!invoiceDocument || !invoiceDocument.documentbody) {
      return res.status(400).json({ message: 'No document provided' });
    }

    const newBasestring = new Basestring({
      reference,
      createdDate,
      code,
      createdTime,
      poReference,
      supplierReference,
      filename: invoiceDocument.filename,
      contentType: invoiceDocument.type,
      documentBody: invoiceDocument.documentbody,
    });

    await newBasestring.save();

    res.status(200).json({ message: 'Data stored successfully', data: newBasestring });
  } catch (error) {
    console.error('Error during data processing:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Document retrieval by ID
router.get('/document/:id', async (req, res) => {
  try {
    const document = await Basestring.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.setHeader('Content-Type', document.contentType);
    res.setHeader('Content-Disposition', `attachment; filename=${document.filename}`);

    const binaryData = Buffer.from(document.documentBody, 'base64');
    res.send(binaryData);
  } catch (error) {
    console.error('Error during document retrieval:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Get all files route
router.get('/files', async (req, res) => {
  try {
    const files = await Basestring.find();
    res.status(200).json({ message: 'Files retrieved successfully', data: files });
  } catch (error) {
    console.error('Error retrieving files:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

module.exports = router;
