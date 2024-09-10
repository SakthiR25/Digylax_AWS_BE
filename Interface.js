const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 8081;

// Define API configurations
const apiConfig = {
  url: 'https://api.newapplication.com/getAttachments',
  method: 'POST', // or 'GET', depending on the API
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  data: {
    // Example body configuration, adjust as needed
    date: new Date().toISOString().slice(0, 10),
  }
};

app.get('/getmail', async (req, res) => {
  console.log('Connection Start');

  try {
    // Fetch attachments from the new application
    const response = await axios(apiConfig);

    const attachments = response.data; // Adjust based on API response structure

    if (attachments.length === 0) {
      console.log('No attachments found.');
      return res.json([]);
    }

    const emails = [];

    for (const attachment of attachments) {
      if (attachment.filename.endsWith('.pdf')) {
        console.log('Processing attachment:', attachment.filename);

        const attachmentData = {
          filename: attachment.filename,
          contentType: attachment.contentType,
          jsonfilename: attachment.filename.replace('.pdf', '.json'),
        };

        const directoryPath = './data';
        if (!fs.existsSync(directoryPath)) {
          fs.mkdirSync(directoryPath);
        }

        const pdfFilePath = path.join(directoryPath, attachment.filename);
        fs.writeFileSync(pdfFilePath, Buffer.from(attachment.content, 'base64'));

        console.log('PDF saved to:', pdfFilePath);

        // Process the saved PDF
        // Note: Assume the PDF processing functions are defined elsewhere
        const dataBuffer = fs.readFileSync(pdfFilePath);
        const pdfData = await pdf(dataBuffer);
        const pdfText = pdfData.text;
        attachmentData.pdfText = pdfText;

        // Extract relevant data from PDF text
        const email = {
          subject: attachment.subject, // Adjust based on API response structure
          date: attachment.date ? new Date(attachment.date).toLocaleString() : null,
          fromEmail: attachment.fromEmail, // Adjust based on API response structure
          toEmail: attachment.toEmail, // Adjust based on API response structure
          filefolder: process.cwd().replace(/\\/g, '/'),
          attachments: [attachmentData],
          lineItems: extractLineItems(pdfText),
          vendorName: extractVendorName(pdfText),
          vendorAddress: extractVendorAddress(pdfText),
          invoiceNo: extractInvoiceNo(pdfText),
          invoiceDate: extractInvoiceDate(pdfText),
          poNo: extractPONo(pdfText),
          netTotal: extractNettotal(pdfText),
        };

        emails.push(email);
      }
    }

    try {
      await Email.insertMany(emails);
      res.json(emails);
    } catch (error) {
      console.error('Error inserting emails:', error);
      res.status(500).json({ error: 'Failed to insert emails' });
    }

  } catch (error) {
    console.error('Error fetching attachments:', error);
    res.status(500).json({ error: 'Failed to fetch attachments' });
  }
});

// const port = 8081;
app.listen(port, () => {
  // console.log(`Server running on port ${port}`);
});
