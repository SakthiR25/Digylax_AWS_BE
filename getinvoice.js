
// const express = require("express");
// const app = express();
// const pdf = require("pdf-parse");

// app.use(bodyParser.json());

// const { Console } = require("console");
// const axios = require("axios");


// app.get("/getpdfcustom", async (req, res) => {
//   try {
//     const pdfCustomData = await PdfCustom.find().lean(); // Retrieve all documents
//     res.status(200).json(pdfCustomData);
//     console.log("API Call >> getpdfcustom >> get records");
//   } catch (error) {
//     res
//       .status(500)
//       .json({ error: "API Calls >> getpdfcustom  >> failed " + error });
//   }
// });

// const PdfInvoice = mongoose.model("pdfinvoice", jsonSchema, "pdfinvoice");
// app.get('/getCsrfToken', (req, res) => {
//   const csrfToken = generateCsrfToken();
//   res.json({ csrfToken });
// });


// app.post('/sapIntegration', async (req, res) => {
//   try {
//     console.log('Request Body:', req.body); // Add this line

//     const { extractedData, targetPoNumber } = req.body;

//     console.log('Extracted Datas:', extractedData);
//     console.log('Target Datas:', targetPoNumber);
//     if (!targetPoNumber) {
//       res.status(400).json({ success: false, message: 'Target PO number is required' });
//       return;
//     }
//     const matchingEntry = extractedData.find(entry => entry.PoNumber === targetPoNumber);

//     // Extract the desired data from the matching entry
//     const requestData = {
//       Description: matchingEntry.Description,
//       PoNumber: matchingEntry.PoNumber,
//       amount: matchingEntry.amount,
//       discount: matchingEntry.discount,
//       gst: matchingEntry.gst,
//       invoiceDate: matchingEntry.invoiceDate,
//       invoiceNumber: matchingEntry.invoiceNumber,
//       netAmount: matchingEntry.netAmount,
//       propertyName: matchingEntry.propertyName,
//       qty: matchingEntry.qty,
//       rate: matchingEntry.rate,
//       tax: matchingEntry.tax,
//       total: matchingEntry.total,
//       vendorAddress: matchingEntry.vendorAddress,
     
//     };

//     // Step 1: Obtain CSRF token
//     const csrfTokenResponse = await axios.get(
//       'http://115.240.201.116:8022/sap/opu/odata/sap/ZAPI_VENDOR_SRV_01/PO_HEADERSet',
//       {
//         headers: {
//           'X-CSRF-Token': 'Fetch',
//         },
//         auth: {
//           username: 'SAPABAP11',
//           password: 'Welcome@1996',
//         },
//       }
//     );
//     console.log('CSRF Token Response:', csrfTokenResponse.data);

//     const csrfToken = csrfTokenResponse.headers['x-csrf-token'];

//     if (!csrfToken) {
//       console.error('CSRF token not available');
//       res.status(500).json({ success: false, message: 'CSRF token not available' });
//       return;
//     }
//     if (!csrfToken || csrfToken === 'Required') {
//       console.error('CSRF token not available or is "Required"');
//       res.status(500).json({ success: false, message: 'CSRF token not available or is "Required"' });
//       return;
//     }
    
//     console.log('CSRF Token Response:', csrfTokenResponse.data);

//     console.log('CSRF Token:', csrfToken);

//     // Step 2: Make the actual POST request
//     const serverIntegrationEndpoint =
//       'http://115.240.201.116:8022/sap/opu/odata/sap/ZAPI_VENDOR_SRV_01/PO_HEADERSet';

//     console.log('Request Data:', requestData);

//     const response = await axios.post(serverIntegrationEndpoint, requestData, {
//       headers: {
//         'Content-Type': 'application/json',
//         'X-CSRF-Token': csrfToken,
//       },
//       auth: {
//         username: 'SAPABAP11',
//         password: 'Welcome@1996',
//       },
//     });

//     console.log('SAP Server Response:', response.data);

//     if (response.status === 200) {
//       console.log('Data successfully stored in SAP');

//       // Create a new response object with the extracted data in the 'data' field
//       const responseData = {
//         success: true,
//         message: 'Data successfully stored in SAP',
//         data: {
//           d: {
//             results: [matchingEntry], // Include the matchingEntry in the 'results' array
//           },
//         },
//       };

//       res.status(200).json(responseData);
//     } else {
//       console.error('Unexpected response from SAP server:', response.status, response.statusText);
//       res.status(500).json({ success: false, message: 'Unexpected response from SAP server' });
//     }
//   } catch (error) {
//     console.error('Error storing data in SAP:', error);

//     let errorMessage = 'Error storing data in SAP';
//     if (error.response) {
//       errorMessage += ` - Status: ${error.response.status}, Data: ${JSON.stringify(
//         error.response.data
//       )}`;
//     } else if (error.request) {
//       errorMessage += ` - No response received from SAP - Request: ${JSON.stringify(
//         error.request
//       )}`;
//     } else {
//       errorMessage += ` - Request setup error: ${error.message}`;
//     }

//     res.status(500).json({ success: false, message: errorMessage });
//   }
// });

// ///////////////////////////////SAP Cofiguration GET Data////////////////////////////

// if (mongoose.models["pdfcustom"]) {
//   module.exports = mongoose.model("pdfcustom");
// } else {
//   // Define the model
//   const invoiceSchema = new mongoose.Schema({
//     InvoiceNo: String,
//     InvoiceDate: Date,
//     PoNo: String,
//     PoDate: Date,
//     Description: String,
//     Quantity: String,
//     Unitprice: String,
//     Total: String,
//     Discount: String,
//     SubTotal: String,
//     Gst: String,
//     Tax: String,
//     NetAmount: String,
//     Remarks: String,
//   });
//   // Define the model
//   module.exports = mongoose.model("pdfcustom", invoiceSchema);
// }

// //const app = express(); // Create an Express application instance
// app.get("/getByInvoiceNo/:invoiceNo", async (req, res) => {
//   try {
//     const invoiceNoParam = req.params.invoiceNo;
//     const data = await PdfCustom.find({ InvoiceNo: invoiceNoParam }).exec();
//     const formattedData = data.map((item) => {
//       return {
//         InvoiceNo: item.InvoiceNo,
       
//       };
//     });

//     if (formattedData.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "PdfCustom >> Fetch InvoiceNo  >> Data not found" });
//     }
//     res.status(200).json(formattedData);
//   } catch (error) {
//     res.status(500).json({ error: "PdfCustom >> Fetch InvoiceNo  >> Failed." });
//   }
// });

// // fetch data from pdfcustom > InvoiceNo

// // ------------------------ pdfcustom >> get Invoiceno --------------------------------------//

// // Remove the following line to avoid disabling certificate verification
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;






// ///Current code
// const imapConfig = {
//   user: "Digylax@gmail.com",  
//   password: "dsel pfce taka msah",
//   host: "imap.gmail.com",
//   port: 993,  
//   tls: true,
//   authTimeout: 10000, 

// };
// /////Current code

// ////////////////////////////////////OPEN PDF DATA////////////////////////////////////////
// // ////////Backup Code////////////////////////

// // ////////Backup Code////////////////////////

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const directoryPath = "./openpdfdata";
//     if (!fs.existsSync(directoryPath)) {
//       fs.mkdirSync(directoryPath);
//     }
//     cb(null, directoryPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname); 
//   },
// });

// const upload = multer({ storage: storage });

// app.post("/upload", upload.single("pdfFile"), (req, res) => {
//   res.status(200).send("PDF file uploaded successfully");
// });




// app.get("/getpdf/list/:filename", (req, res) => {
//   const filename = req.params.filename;
//   const filePath = path.join(__dirname, "data", filename);

//   try {
//     const pdfContent = fs.readFileSync(filePath);
    
//     // Set appropriate headers for serving a PDF file
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader("Content-Disposition", `inline; filename=${filename}`);
    
//     // Send the PDF content in the response
//     res.status(200).send(pdfContent);
//   } catch (error) {
//     console.error("Error reading PDF file:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });



// ////////////////////////////////////OPEN PDF DATA////////////////////////////////////////







// ////////////////////////////////////////////////////Incoming Invoice Box Count part//////////////////
// ///////// ////////////////////////////////////////Backup Code///////////////////////////////////////////
// app.get('/count-incoming-emails', (req, res) => {
//   countIncomingEmails((incomingEmailCount) => {
//     res.json({ count: incomingEmailCount });
//   });
// });

// function countIncomingEmails(callback) {
//   const imap = new Imap(imapConfig);

//   imap.once('ready', () => {
//     imap.openBox('INBOX', true, (err, box) => {
//       if (err) throw err;

//       // Calculate the start date as today's date
//       const startDate = new Date();
//       startDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for the start of the day

//       const searchCriteria = ['ALL'];
//       const fetchOptions = { bodies: '', markSeen: false };

//       imap.search([['SINCE', startDate]], (searchError, results) => {
//         if (searchError) throw searchError;

//         const incomingEmailCount = results.length;

//         imap.end(); // Close the connection

//         callback(incomingEmailCount);
//       });
//     });
//   });

//   imap.once('error', (error) => {
//     console.error('IMAP connection error:', error);
//     callback(0); // Return 0 if there is an error
//   });

//   imap.connect();
// }

// /////////////////////////////////////////////////////////////////////backup code//////////////////


// /////////Count the Incoming Invoice/////////////////////////////////////


// app.get('/count-incoming-emails', (req, res) => {
//   countIncomingEmails((incomingEmailCount) => {
//     res.json({ count: incomingEmailCount });
//   });
// });

// function countIncomingEmails(callback) {
//   const imap = new Imap(imapConfig);
//   let responseSent = false; 

//   imap.once('ready', () => {
//     imap.openBox('INBOX', true, (err, box) => {
//       if (err) {
//         handleError(err);
//         return;
//       }

//       // Calculate the start date as today's date
//       const startDate = new Date();
//       startDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for the start of the day

//       const searchCriteria = ['ALL'];
//       const fetchOptions = { bodies: '', markSeen: false };

//       imap.search([['SINCE', startDate]], (searchError, results) => {
//         if (searchError) {
//           handleError(searchError);
//           return;
//         }

//         const incomingEmailCount = results.length;

//         imap.end(); // Close the connection

//         if (!responseSent) {
//           callback(incomingEmailCount);
//           responseSent = true;
//         }
//       });
//     });
//   });

//   imap.once('error', (error) => {
//     handleError(error);
//   });

//   function handleError(error) {
//     console.error('IMAP connection error:', error);
//     imap.end(); // Close the connection explicitly

//     if (!responseSent) {
//       callback(0); // Return 0 if there is an error and the response hasn't been sent
//       responseSent = true;
//     }
//   }

//   imap.connect();
// }

// ///////////Count the Incoming Invoice/////////////////////////////////////





// ///////////Count the Incoming Error Records/////////////////////////////////////

// ///////////////////code 2////////////////////////
// app.get('/count-error-emails', (req, res) => {
//   countErrorEmails((error, errorEmailCount) => {
//     if (error) {
//       console.error('Error counting error emails:', error);

//       // Check if headers have already been sent before sending an error response
//       if (!res.headersSent) {
//         res.status(500).json({ error: 'Error counting error emails' });
//       }
//     } else {
//       // Check if headers have already been sent before sending the success response
//       if (!res.headersSent) {
//         res.json({ count: errorEmailCount });
//       }
//     }
//   });
// });

// function countErrorEmails(callback) {
//   const imap = new Imap(imapConfig);

//   imap.once('ready', () => {
//     imap.openBox('INBOX', true, (err, box) => {
//       if (err) {
//         imap.end();
//         return callback(err);
//       }

//       const startDate = new Date();
//       startDate.setHours(0, 0, 0, 0);

//       const searchCriteria = ['FROM', 'sakthivel@gmail.com'];
//       const fetchOptions = { bodies: '', markSeen: false };

//       imap.search([['SINCE', startDate], searchCriteria], (searchError, results) => {
//         imap.end(); // Always end the IMAP connection

//         if (searchError) {
//           return callback(searchError);
//         }

//         const errorEmailCount = results.length;
//         callback(null, errorEmailCount);
//       });
//     });
//   });

//   imap.once('error', (error) => {
//     handleError(error);
//   });

//   function handleError(error) {
//     console.error('IMAP connection error:', error);

//     // Check if headers have already been sent before calling callback
//     if (!callbackCalled) {
//       callbackCalled = true;
//       callback(error);
//     }
//   }

//   let callbackCalled = false; // Track whether the callback has been called

//   imap.connect();
// }


// ///////////Count the Incoming Error Records/////////////////////////////////////

// ////////////////////////////////////////////////////Incoming Invoice Box Count part//////////////////

// //////// ////My Pdf extarction data stored Mongodb Database Schema////////////////////////////

// const emailSchema = new mongoose.Schema({
//   subject: String,
//   date: Date,
//   fromEmail: String,
//   toEmail: String,
//   filefolder: String,

//   attachments: [{
//     filename: String,
//     contentType: String,
//     jsonfilename: String,
//     pdfText: String,
//   }],
// }, { collection: 'GetMailInvoiceDatas' });

// const Email = mongoose.model('Email', emailSchema);

// //////// ////My Pdf extarction data stored Mongodb Database Schema////////////////////////////


// ///////////////////////////PDF STORED IN ./data File path Code In Down ////////////////////////////////////////////////
// /////You can change the name getmails instead of getmail na should take "pdf click to open" is working you change frontrned also//////////
// app.get('/getmail', async (req, res) => {
//   console.log('Connection Start');

//   const getEmails = async () => {
//     try {
//       const imap = new Imap(imapConfig);

//       imap.once('ready', () => {
//         const desiredDate = new Date();
//         const searchCriteria = [['ON', desiredDate.toISOString().slice(0, 10)]];

//         imap.openBox('INBOX', false, () => {
//           imap.search(searchCriteria, async (err, results) => {
//             if (err) {
//               console.error('Search error:', err);
//               imap.end();
//               return res.status(500).json({ error: err.message });
//             }

//             if (results.length === 0) {
//               console.log('No messages found.');
//               imap.end();
//               return res.json([]);
//             }

//             const f = imap.fetch(results, { bodies: '', struct: true });
//             const emails = [];

//             f.on('message', (msg) => {
//               msg.on('body', (stream) => {
//                 let buffer = '';
//                 stream.on('data', (chunk) => buffer += chunk.toString('utf8'));
//                 stream.on('end', async () => {
//                   try {
//                     const parsed = await simpleParser(buffer);
//                     console.log('Number of attachments:', parsed.attachments.length);

//                     const email = {
//                       subject: parsed.subject,
//                       date: parsed.date ? parsed.date.toLocaleString() : null,
//                       fromEmail: parsed.from.value[0].address,
//                       toEmail: parsed.to.value[0].address,
//                       filefolder: process.cwd().replace(/\\/g, '/'),
//                       attachments: [],
//                       lineItems: [],
//                       vendorName: null,
//                       vendorAddress: null,
//                       invoiceNo: null,
//                       invoiceDate: null,
//                       poNo: null,
//                       netTotal: null,
//                     };

//                     if (parsed.attachments && Array.isArray(parsed.attachments)) {
//                       await Promise.all(parsed.attachments.map(async (attachment) => {
//                         if (attachment && attachment.filename.endsWith('.pdf')) {
//                           console.log('Processing attachment:', attachment.filename);

//                           const attachmentData = {
//                             filename: attachment.filename,
//                             contentType: attachment.contentType,
//                             jsonfilename: attachment.filename.replace('.pdf', '.json'),
//                           };

//                           const directoryPath = './data';
//                           if (!fs.existsSync(directoryPath)) {
//                             fs.mkdirSync(directoryPath);
//                           }

//                           const pdfFilePath = path.join(directoryPath, attachment.filename);
//                           fs.writeFileSync(pdfFilePath, Buffer.from(attachment.content, 'base64'));

//                           console.log('PDF saved to:', pdfFilePath);

//                           const dataBuffer = fs.readFileSync(pdfFilePath);
//                           const pdfData = await pdf(dataBuffer);
//                           const pdfText = pdfData.text;
//                           attachmentData.pdfText = pdfText;

//                           // Extract relevant data from PDF text
//                           email.vendorName = extractVendorName(pdfText);
//                           email.vendorAddress = extractVendorAddress(pdfText);
//                           email.invoiceNo = extractInvoiceNo(pdfText);
//                           email.invoiceDate = extractInvoiceDate(pdfText);
//                           email.poNo = extractPONo(pdfText);
//                           email.netTotal = extractNettotal(pdfText);

//                           // Extract line items from PDF text
//                           email.lineItems = extractLineItems(pdfText);

//                           email.attachments.push(attachmentData);
//                         }
//                       }));
//                     }

//                     emails.push(email);
//                   } catch (error) {
//                     console.error('Error processing email:', error);
//                   }
//                 });
//               });
//             });

//             f.once('error', (ex) => {
//               imap.end();
//               return res.status(500).json({ error: ex.message });
//             });

//             f.once('end', async () => {
//               imap.end();

//               try {
//                 await Email.insertMany(emails);
//                 res.json(emails);
//               } catch (error) {
//                 console.error('Error inserting emails:', error);
//                 res.status(500).json({ error: 'Failed to insert emails' });
//               }
//             });
//           });
//         });
//       });

//       imap.once('error', (err) => {
//         res.status(500).json({ error: err.message });
//       });

//       imap.once('end', () => {
//         console.log('Connection ended');
//       });

//       imap.connect();
//     } catch (ex) {
//       res.status(500).json({ error: 'An error occurred' });
//     }
//   };

//   // Helper function to extract data using regex pattern
//   function extractField(text, pattern) {
//     const match = text.match(pattern);
//     return match ? match[1].trim() : null;
//   }

//   // Extract Vendor Name
  
//   function extractVendorName(text) {
//     // Patterns to match "Entered By:", "Supplier:", and "VENDORNAME:"
//     const enteredByPattern = /Entered By:\s*([^\n]+)/;
//     const supplierPattern = /Supplier:\s*([^\n]+)/;
//     const vendorNamePattern = /VENDORNAME:\s*([^\n]+)/;
//     const vendorNamePattern1 = /(?:\n|\r\n)?([A-Z0-9\s]+ - [A-Z\s]+)\s*/;
//     const supplieraddress = /SUPPLIER ADDRESS:\s*([^\n]+)/;


//     let match = text.match(enteredByPattern);
//     if (match) {
//         return match[1].trim();
//     }
//     match = text.match(supplierPattern);
//     if (match) {
//         return match[1].trim();
//     }
//     match = text.match(vendorNamePattern);
//     if (match) {
//       return match[1].trim();
//   }
//   match = text.match(supplieraddress);
//   if (match) {
//     return match[1].trim();
// }


//   match = text.match(vendorNamePattern1);
//     return match ? match[1].trim() : null;
// }



//   // Extract Vendor Address
//   function extractVendorAddress(text) {
//     const documentNoPattern = /Business Place:\s*([^:\n]+)/;
//     const supplierPattern = /Supplier:\s*([^\n]+)\n(?:[^\n]*\n){1,}([^\n]+(?:\n[^\n]+)*)/;
//     const billToShippedToPattern = /BilltoShippedTo:[\s\S]*?(\w[\w\s,.-]*\d{6})/;
//     const kd = /Document No\.\s*[\n:]*\s*([^\n]*)/i;
//     const wipro =  /Supplier address:\s*([\s\S]+?)\s*GSTIN:/;
//     const wiAddress = /SUPPLIER ADDRESS:\s*([\s\S]+?)\s*GSTIN:/;


//     // Try to match "Business Place:" pattern
//     let match = text.match(documentNoPattern);
//     if (match) {
//         return match[1].trim();
//     }

//     // Try to match "Supplier:" pattern
//     match = text.match(supplierPattern);
//     if (match) {
//         return match[1].trim();
//     }
//     match = text.match(billToShippedToPattern);
//     if (match) {
//       return match[1].trim();
//   }
//   match = text.match(kd);
//   if (match) {
//     return match[1].trim();
// }
// match = text.match(wipro);
// if (match) {
//   return match[1].trim();
// }
// match = text.match(wiAddress);
   
//     return match ? match[1].trim() : null;
// }


//   // Extract Invoice No
  
  
//   function extractInvoiceNo(text) {
//     const inwardNoPattern = /Inward No:\s*(\d+)/;
//     const documentNoPattern = /Document No\.\s*:\s*([^\n]+)/;
//     const supplierPattern = /Party Inv No:\s*([^\n]+)/i;
//       const invoiceNoPattern = /InvoiceNo\.\s*:([\s\S]+?)\n/i;
//       const ds = /E-Way Bill No:\s*([\d\s]+)/i;
//       const inno = /Invoice No:\s*(\d+)\s*/
      

    
//     let match = text.match(inwardNoPattern);
//     if (match) {
//         return match[1].trim();
//     }
    
//     match = text.match(documentNoPattern);
//     if (match) {
//         return match[1].trim();
//     }
    
//     match = text.match(supplierPattern);
//     if (match) {
//         return match[1].trim();
//     }
    
//     match = text.match(invoiceNoPattern);
//     if (match) {
//       return match[1].trim();
//   }
//   match = text.match(inno);
//   if (match) {
//     return match[1].trim();
// }
  
//   match = text.match(ds);
  
 
   
//     return match ? match[1].trim() : null;
// }

//   // // Extract Invoice Date
//   function extractInvoiceDate(text) {
//     // Pattern to match "MRN Date:" followed by text until a newline
//     const mrnDatePattern = /MRN Date:\s*([^\n]+)/;
    
//     // Pattern to match "Document Date:" followed by text until a newline
//     const documentNoPattern = /Document Date:\s*([^\n]+)/;
    
//     // Pattern to match "Due Date:" followed by digits and periods
//     const dueDatePattern = /Due Date:\s*([\d.]+)/;
    
//     // Pattern to match "Invoice Date:" followed by text until a newline
//     const invoiceDatePattern = /Invoice\s*Date\s*([^\n]+)/i;

//     const hdshfh =/Document Date\s*[\n:]*\s*([\d/]+)\s*/i;
//     const jd =/Date:\s*([^\n]+)/;

//     let match = text.match(mrnDatePattern);
//     if (match) {
//         return match[1].trim();
//     }
    
//     match = text.match(documentNoPattern);
//     if (match) {
//         return match[1].trim();
//     }
//     match = text.match(jd);
//     if (match) {
//         return match[1].trim();
//     }
    
//     match = text.match(dueDatePattern);
//     if (match) {
//         return match[1].trim();
//     }
    
//     match = text.match(invoiceDatePattern);
//     if (match) {
//       return match[1].trim();
//   }
  
  
//   match = text.match(hdshfh);
//     return match ? match[1].trim() : null;
// }


//   // Extract PO No

// function extractPONo(text) {
//   const poNoPattern = /Ref No\.\s*:\s*([^\n]+)/;
//   const poNoPattern1 = /PONo\.\s*([\d]+)/;
//   // const poNoPattern2 = /001269:\s*[\r\n]*([\w\/\-]+)/; 
//   const poNoPattern2 =/Purchase Order:\s*[\n:]*\s*([\d/]+)\s*/i;

//   let match = text.match(poNoPattern);
//   if (match) {
//     return match[1].trim();
//   }
//   match = text.match(poNoPattern1);

//   match = text.match(poNoPattern2);
//   if (match) {
//     return match[1].trim();
//   }
//   return match ? match[1].trim() : null;
// }

  





//   function extractNettotal(text) {
//     // Define regex patterns for extracting the total amount
//     const enteredByPattern = /Net Payable amount:\s*([\d,]+\.\d{2})/;
//     const supplierPattern = /Total\s+Amount\s*([\d,.]+)/;
//     const netTotalPattern = /(?:Total\s*([\d,.]+))/;
  
//     let match = text.match(enteredByPattern);
//     if (match) {
//       return match[1].trim();
//     }
  
//     // Attempt to match the second pattern
//     match = text.match(supplierPattern);
//     if (match) {
//       return match[1].trim();
//     }
  
//     // Attempt to match the third pattern for Net Total
//     match = text.match(netTotalPattern);
//     return match ? match[1].trim() : null;
//   }
  

//   // Extract line items from text
//   function extractLineItems(text) {
//     const lineItemRegex = /(\d{8,})[\s\S]*?([\d,.]+)[\s\S]*?([\d,.]+)[\s\S]*?(?:Brigade Plus[\s\S]*?)?([\d,.]+)(?:\s*EA|$)/g;
   

//     const accountDescriptionRegex = /(\d{8,})\s*([^\n]+)/g;

//     // Extract line items using regex pattern
//     const lineItems = [];
//     let match;
//     while ((match = lineItemRegex.exec(text)) !== null) {
//       let accountDescriptionMatch = accountDescriptionRegex.exec(text);
//       const description = accountDescriptionMatch ? accountDescriptionMatch[2].trim() : match[0].replace(/\d{8,}/g, '').trim();
//       const quantity = match[4].replace(/\d{8,}/g, '').trim();
//       // const price = match[2];
//       const price = match[3].trim();

//       const rate = null; // If rate is not available, set as null
//       const discount = null; // If discount is not available, set as null
//       const subTotal = null; // If subTotal is not available, set as null

//       lineItems.push({
//         description,
//         quantity,
//         rate,
//         price,
//         discount,
//         subTotal,
//       });
//     }
//     return lineItems;
//   }

//   await getEmails();
// });

// // const port = 8081;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });








































const express = require("express");
const app = express();
const cors = require("cors");
const pdf = require("pdf-parse");
const fsJson = require("fs"); 
const htmlTemplate = require("./getinvoice");
const path = require("path"); 
const multer = require("multer"); 
const fs = require("fs")
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const port = process.env.PORT || 8081;

////////////////SAP Integration Part////////////
const sapIntegration = require('./sapIntegration');
////////////////SAP Integration Part////////////


/////////////imagelogopart////////////////////
const backendApp = require('./server');
/////////////imagelogopart////////////////////
//  const sappodataintegration =require('./sappointegration')

////////////Tab Datas Import Part/////////////////////
const Tabs = require('./Tabdatas')

////////////Tab Datas Import Part/////////////////////
const authentication = require('./Authentication');


///////////Line Chart Part///////////////////
// const chartcount = require('./chartcounter')
///////////Line Chart Part///////////////////

/////////Invoice Layout////////////////////
const InvoiceLayout = require('./Invoicelayout')
////////Invoice Layout////////////////////


/////// PDF Base64////////////////////////
 const Base64pdfs = require('./pdfbase64')
////// PDF Base64////////////////////////

/////////Options Layouts///////////////////
const Layout = require('./Layouts')
/////////Options Layouts///////////////////




app.use(cors());

const mongoose = require("mongoose");

const { MongoClient } = require("mongodb"); 

const Imap = require("imap");
const { simpleParser } = require("mailparser");
// const fs = require("fs"); // Add this line to require the 'fs' module
const { Console } = require("console");
const axios = require("axios");
const myapp = require('./server');
const { JSHandle } = require("puppeteer");




app.use(
  cors({
    origin: "*", // Replace with your actual frontend domain
    methods: "GET,POST",
  })
);

// ------------------------ mongo db -------------------------------------//

app.use(express.json());

// const mongoConfig = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };
const mongoOptions = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  ssl: true, 
  sslValidate: true, 
};






// const dbName = "socialsivakumar";
const dbName = "sakthivel";


// const uri =
//   "mongodb+srv://socialsivakumar:PDDN51ZynmfefV3R@cluster0.3a7tjhp.mongodb.net/" +
//   dbName +
//   "?retryWrites=true&w=majority";

const collectionName = "pdfcustom";

//////suppose error means connect the commanted mongo url///////////////////
// const mongoURI = 'mongodb+srv://socialsivakumar:PDDN51ZynmfefV3R@cluster0.3a7tjhp.mongodb.net/OCRHorizon';
//////suppose error means connect the commanted mongo url///////////////////

const mongoURI = 'mongodb+srv://sakthivel:sakthi@cluster0.dconihp.mongodb.net/OCRHorizon';




// mongoose.connect(uri, mongoConfig); 
mongoose.connect(mongoURI, mongoOptions)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error.message);
  });


// -------------------- get pdfcustom >> // Retrieve all documents -------------------------//
// const PdfCustom = mongoose.model("pdfcustom", invoiceSchema, "pdfcustom");
app.get("/getpdfcustom", async (req, res) => {
  try {
    const pdfCustomData = await PdfCustom.find().lean(); // Retrieve all documents
    res.status(200).json(pdfCustomData);
    console.log("API Call >> getpdfcustom >> get records");
  } catch (error) {
    res
      .status(500)
      .json({ error: "API Calls >> getpdfcustom  >> failed " + error });
  }
});

// -------------------- get pdfcustom >> // Retrieve all documents -------------------------//

// -------------------- get pdfinvoice >> // Retrieve all documents -------------------------//

// Define the Item schema
const itemSchema = new mongoose.Schema({
  Description: String,
  Quantity: String,
  UnitPrice: String,
  Total: String,
  Discount: String,
});

// Define the PdfInvoice schema
const jsonSchema = new mongoose.Schema({
  id: String,
  PdfId: String,
  VendorName: String,
  VendorAddress: String,
  VendorCity: String,
  VendorPincode: String,
  InvoiceNo: String,
  InvoiceDate: Date,
  PoNo: String,
  PoDate: Date,
  items: [itemSchema], 
  Discount: String,
  SubTotal: String,
  Tax: String,
  Gst: String,
  NetAmount: String,
  Remarks: String,
});

const PdfInvoice = mongoose.model("pdfinvoice", jsonSchema, "pdfinvoice");



/////////////////////////SAP Configuration PART////////////////////////////////////////

// app.get('/getCsrfToken', (req, res) => {
//   // Replace this with your logic to generate a CSRF token
//   const csrfToken = generateCsrfToken();
//   res.json({ csrfToken });
// });

// app.post('/sapIntegration', async (req, res) => {
//   try {
//     const { originalData, extractedData } = req.body;

//     // Step 1: Obtain CSRF token
//     const csrfTokenResponse = await axios.get(
//       'http://115.240.201.116:8022/sap/opu/odata/sap/ZAPI_VENDOR_SRV_01/',
//       {
//         headers: {
//           'X-CSRF-Token': 'Fetch',
//         },
//         auth: {
//           username: 'SAPABAP11',
//           password: 'Welcome@1996',
//         },
//       }
//     );

//     const csrfToken = csrfTokenResponse.headers['x-csrf-token'];

//     if (!csrfToken) {
//       console.error('CSRF token not available');
//       res.status(500).json({ success: false, message: 'CSRF token not available' });
//       return;
//     }

//     console.log('CSRF Token:', csrfToken);

//     // Step 2: Make the actual POST request
//     const serverIntegrationEndpoint =
//       'http://115.240.201.116:8022/sap/opu/odata/sap/ZAPI_VENDOR_SRV_01/PO_HEADERSet';

//     const requestData = {
//       originalData: originalData,
//       extractedData: extractedData,
//     };

//     console.log('Request Data:', requestData);

//     const response = await axios.post(serverIntegrationEndpoint, requestData, {
//       headers: {
//         'Content-Type': 'application/json',
//         'X-CSRF-Token': csrfToken,
//       },
//       auth: {
//         username: 'SAPABAP11',
//         password: 'Welcome@1996',
//       },
//     });

//     console.log('SAP Server Response:', response.data);

//     if (response.status === 200) {
//       console.log('Data successfully stored in SAP');
//       res.status(200).json({ success: true, message: 'Data successfully stored in SAP' });
//     } else {
//       console.error('Unexpected response from SAP server:', response.status, response.statusText);
//       res.status(500).json({ success: false, message: 'Unexpected response from SAP server' });
//     }
//   } catch (error) {
//     console.error('Error storing data in SAP:', error);

//     let errorMessage = 'Error storing data in SAP';
//     if (error.response) {
//       errorMessage += ` - Status: ${error.response.status}, Data: ${JSON.stringify(
//         error.response.data
//       )}`;
//     } else if (error.request) {
//       errorMessage += ` - No response received from SAP - Request: ${JSON.stringify(
//         error.request
//       )}`;
//     } else {
//       errorMessage += ` - Request setup error: ${error.message}`;
//     }

//     res.status(500).json({ success: false, message: errorMessage });
//   }
// });



///////////////Backup code///////////////////////////////////////




// app.get('/getCsrfToken', (req, res) => {
//   // Replace this with your logic to generate a CSRF token
//   const csrfToken = generateCsrfToken();
//   res.json({ csrfToken });
// });
// app.post('/sapIntegration', async (req, res) => {
//   try {
//     const { originalData, extractedData } = req.body;

//     // Step 1: Obtain CSRF token
//     const csrfTokenResponse = await axios.get(
//       'http://115.240.201.116:8022/sap/opu/odata/sap/ZAPI_VENDOR_SRV_01/',
//       {
//         headers: {
//           'X-CSRF-Token': 'Fetch',
//         },
//         auth: {
//           username: 'SAPABAP11',
//           password: 'Welcome@1996',
//         },
//       }
//     );

//     const csrfToken = csrfTokenResponse.headers['x-csrf-token'];

//     if (!csrfToken) {
//       console.error('CSRF token not available');
//       res.status(500).json({ success: false, message: 'CSRF token not available' });
//       return;
//     }

//     console.log('CSRF Token:', csrfToken);

//     // Step 2: Make the actual POST request
//     const serverIntegrationEndpoint =
//       'http://115.240.201.116:8022/sap/opu/odata/sap/ZAPI_VENDOR_SRV_01/PO_HEADERSet';

//     const requestData = {
//       originalData: originalData,
//       extractedData: extractedData,
//       // PO_Document_Number: "420005552"
//     };

//     console.log('Request Data:', requestData);

//     const response = await axios.post(serverIntegrationEndpoint, requestData, {
//       headers: {
//         'Content-Type': 'application/json',
//         'X-CSRF-Token': csrfToken,
//       },
//       auth: {
//         username: 'SAPABAP11',
//         password: 'Welcome@1996',
//       },
//     });

//     console.log('SAP Server Response:', response.data);

//     if (response.status === 200) {
//       console.log('Data successfully stored in SAP');
//       res.status(200).json({ success: true, message: 'Data successfully stored in SAP' });
//     } else {
//       console.error('Unexpected response from SAP server:', response.status, response.statusText);
//       res.status(500).json({ success: false, message: 'Unexpected response from SAP server' });
//     }
//   } catch (error) {
//     console.error('Error storing data in SAP:', error);

//     let errorMessage = 'Error storing data in SAP';
//     if (error.response) {
//       errorMessage += ` - Status: ${error.response.status}, Data: ${JSON.stringify(
//         error.response.data
//       )}`;
//     } else if (error.request) {
//       errorMessage += ` - No response received from SAP - Request: ${JSON.stringify(
//         error.request
//       )}`;
//     } else {
//       errorMessage += ` - Request setup error: ${error.message}`;
//     }

//     res.status(500).json({ success: false, message: errorMessage });
//   }
// });
//////////////////////Backup code///////////////////////////////////////////




app.get('/getCsrfToken', (req, res) => {
  // Replace this with your logic to generate a CSRF token
  const csrfToken = generateCsrfToken();
  res.json({ csrfToken });
});


app.post('/sapIntegration', async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Add this line

    const { extractedData, targetPoNumber } = req.body;



    console.log('Extracted Datas:', extractedData);
    console.log('Target Datas:', targetPoNumber);



    if (!targetPoNumber) {
      res.status(400).json({ success: false, message: 'Target PO number is required' });
      return;
    }

    // Add a condition to filter by Vendor number
    const matchingEntry = extractedData.find(entry => entry.PoNumber === targetPoNumber);

   

    // Extract the desired data from the matching entry
    const requestData = {
      Description: matchingEntry.Description,
      PoNumber: matchingEntry.PoNumber,
      amount: matchingEntry.amount,
      discount: matchingEntry.discount,
      gst: matchingEntry.gst,
      invoiceDate: matchingEntry.invoiceDate,
      invoiceNumber: matchingEntry.invoiceNumber,
      netAmount: matchingEntry.netAmount,
      propertyName: matchingEntry.propertyName,
      qty: matchingEntry.qty,
      rate: matchingEntry.rate,
      tax: matchingEntry.tax,
      total: matchingEntry.total,
      vendorAddress: matchingEntry.vendorAddress,
      // PO_Document_Number: matchingEntry.PO_Document_Number,
      // Add other properties as needed
    };

    // Step 1: Obtain CSRF token
    const csrfTokenResponse = await axios.get(
      'http://115.240.201.116:8022/sap/opu/odata/sap/ZAPI_VENDOR_SRV_01/PO_HEADERSet',
      {
        headers: {
          'X-CSRF-Token': 'Fetch',
        },
        auth: {
          username: 'SAPABAP11',
          password: 'Welcome@1996',
        },
      }
    );
    console.log('CSRF Token Response:', csrfTokenResponse.data);

    const csrfToken = csrfTokenResponse.headers['x-csrf-token'];

    if (!csrfToken) {
      console.error('CSRF token not available');
      res.status(500).json({ success: false, message: 'CSRF token not available' });
      return;
    }
    if (!csrfToken || csrfToken === 'Required') {
      console.error('CSRF token not available or is "Required"');
      res.status(500).json({ success: false, message: 'CSRF token not available or is "Required"' });
      return;
    }
    
    console.log('CSRF Token Response:', csrfTokenResponse.data);

    console.log('CSRF Token:', csrfToken);

    // Step 2: Make the actual POST request
    const serverIntegrationEndpoint =
      'http://115.240.201.116:8022/sap/opu/odata/sap/ZAPI_VENDOR_SRV_01/PO_HEADERSet';

    console.log('Request Data:', requestData);

    const response = await axios.post(serverIntegrationEndpoint, requestData, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      auth: {
        username: 'SAPABAP11',
        password: 'Welcome@1996',
      },
    });

    console.log('SAP Server Response:', response.data);

    if (response.status === 200) {
      console.log('Data successfully stored in SAP');

      // Create a new response object with the extracted data in the 'data' field
      const responseData = {
        success: true,
        message: 'Data successfully stored in SAP',
        data: {
          d: {
            results: [matchingEntry], // Include the matchingEntry in the 'results' array
          },
        },
      };

      res.status(200).json(responseData);
    } else {
      console.error('Unexpected response from SAP server:', response.status, response.statusText);
      res.status(500).json({ success: false, message: 'Unexpected response from SAP server' });
    }
  } catch (error) {
    console.error('Error storing data in SAP:', error);

    let errorMessage = 'Error storing data in SAP';
    if (error.response) {
      errorMessage += ` - Status: ${error.response.status}, Data: ${JSON.stringify(
        error.response.data
      )}`;
    } else if (error.request) {
      errorMessage += ` - No response received from SAP - Request: ${JSON.stringify(
        error.request
      )}`;
    } else {
      errorMessage += ` - Request setup error: ${error.message}`;
    }

    res.status(500).json({ success: false, message: errorMessage });
  }
});




///////////////////////////////SAP Cofiguration GET Data////////////////////////////


// ------------------------ upload image ----------------------------------------------------//

// ------------------------ pdfcustom >> get Invoiceno --------------------------------------//

if (mongoose.models["pdfcustom"]) {
  module.exports = mongoose.model("pdfcustom");
} else {
  // Define the model
  const invoiceSchema = new mongoose.Schema({
    InvoiceNo: String,
    InvoiceDate: Date,
    PoNo: String,
    PoDate: Date,
    Description: String,
    Quantity: String,
    Unitprice: String,
    Total: String,
    Discount: String,
    SubTotal: String,
    Gst: String,
    Tax: String,
    NetAmount: String,
    Remarks: String,
  });
  // Define the model
  module.exports = mongoose.model("pdfcustom", invoiceSchema);
}

// fetch data from pdfcustom > InvoiceNo
//const express = require("express");
//const app = express(); // Create an Express application instance
app.get("/getByInvoiceNo/:invoiceNo", async (req, res) => {
  try {
    const invoiceNoParam = req.params.invoiceNo;
    const data = await PdfCustom.find({ InvoiceNo: invoiceNoParam }).exec();
    const formattedData = data.map((item) => {
      return {
        // _id: item._id,
        InvoiceNo: item.InvoiceNo,
        // InvoiceDate: item.InvoiceDate,
        // Description: item.Description,
        // Quantity: item.Quantity,
        // Unitprice: item.Unitprice,
        // Total: item.Total,
        // Discount: item.Discount,
        // SubTotal: item.SubTotal,
        // Gst: item.Gst,
        // Tax: item.Tax,F
        // NetAmount: item.NetAmount,
        // Remarks: item.Remarks,
        //__v: item.__v,
      };
    });

    if (formattedData.length === 0) {
      return res
        .status(404)
        .json({ message: "PdfCustom >> Fetch InvoiceNo  >> Data not found" });
    }
    res.status(200).json(formattedData);
  } catch (error) {
    res.status(500).json({ error: "PdfCustom >> Fetch InvoiceNo  >> Failed." });
  }
});

// fetch data from pdfcustom > InvoiceNo

// ------------------------ pdfcustom >> get Invoiceno --------------------------------------//

// Remove the following line to avoid disabling certificate verification
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

// const imapConfig = {
//   user: "sakthivelrajendran10062@gmail.com",
//   password: "madr puxx zvko krbq",
//   host: "imap.gmail.com",
//   port: 993,
//   tls: true,
// };


/////6/17/2024 backup code
// const imapConfig = {
//   user: "sakthivelrajendran10062@gmail.com",
//   password: "madr puxx zvko krbq",
//   host: "imap.gmail.com",
//   port: 993,
//   tls: true,
//   // authTimeout: 30000, // Set a higher value for authentication timeout in milliseconds
//   authTimeout: 10000, // Set a 10-second authentication timeout  (Already standard no changes)

// };
/////6/17/2024 backup code








///Current code
const imapConfig = {
  user: "Digylax@gmail.com",  
  password: "dsel pfce taka msah",
  host: "imap.gmail.com",
  port: 993,  
  tls: true,
  authTimeout: 10000, 

};
/////Current code

////////////////////////////////////OPEN PDF DATA////////////////////////////////////////
// ////////Backup Code////////////////////////

// ////////Backup Code////////////////////////

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const directoryPath = "./openpdfdata";
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }
    cb(null, directoryPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); 
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("pdfFile"), (req, res) => {
  res.status(200).send("PDF file uploaded successfully");
});




app.get("/getpdf/list/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "data", filename);

  try {
    const pdfContent = fs.readFileSync(filePath);
    
    // Set appropriate headers for serving a PDF file
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename=${filename}`);
    
    // Send the PDF content in the response
    res.status(200).send(pdfContent);
  } catch (error) {
    console.error("Error reading PDF file:", error);
    res.status(500).send("Internal Server Error");
  }
});



////////////////////////////////////OPEN PDF DATA////////////////////////////////////////







////////////////////////////////////////////////////Incoming Invoice Box Count part//////////////////
///////// ////////////////////////////////////////Backup Code///////////////////////////////////////////
app.get('/count-incoming-emails', (req, res) => {
  countIncomingEmails((incomingEmailCount) => {
    res.json({ count: incomingEmailCount });
  });
});

function countIncomingEmails(callback) {
  const imap = new Imap(imapConfig);

  imap.once('ready', () => {
    imap.openBox('INBOX', true, (err, box) => {
      if (err) throw err;

      // Calculate the start date as today's date
      const startDate = new Date();
      startDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for the start of the day

      const searchCriteria = ['ALL'];
      const fetchOptions = { bodies: '', markSeen: false };

      imap.search([['SINCE', startDate]], (searchError, results) => {
        if (searchError) throw searchError;

        const incomingEmailCount = results.length;

        imap.end(); // Close the connection

        callback(incomingEmailCount);
      });
    });
  });

  imap.once('error', (error) => {
    console.error('IMAP connection error:', error);
    callback(0); // Return 0 if there is an error
  });

  imap.connect();
}

/////////////////////////////////////////////////////////////////////backup code//////////////////


/////////Count the Incoming Invoice/////////////////////////////////////


app.get('/count-incoming-emails', (req, res) => {
  countIncomingEmails((incomingEmailCount) => {
    res.json({ count: incomingEmailCount });
  });
});

function countIncomingEmails(callback) {
  const imap = new Imap(imapConfig);
  let responseSent = false; 

  imap.once('ready', () => {
    imap.openBox('INBOX', true, (err, box) => {
      if (err) {
        handleError(err);
        return;
      }

      // Calculate the start date as today's date
      const startDate = new Date();
      startDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for the start of the day

      const searchCriteria = ['ALL'];
      const fetchOptions = { bodies: '', markSeen: false };

      imap.search([['SINCE', startDate]], (searchError, results) => {
        if (searchError) {
          handleError(searchError);
          return;
        }

        const incomingEmailCount = results.length;

        imap.end(); // Close the connection

        if (!responseSent) {
          callback(incomingEmailCount);
          responseSent = true;
        }
      });
    });
  });

  imap.once('error', (error) => {
    handleError(error);
  });

  function handleError(error) {
    console.error('IMAP connection error:', error);
    imap.end(); // Close the connection explicitly

    if (!responseSent) {
      callback(0); // Return 0 if there is an error and the response hasn't been sent
      responseSent = true;
    }
  }

  imap.connect();
}

///////////Count the Incoming Invoice/////////////////////////////////////





///////////Count the Incoming Error Records/////////////////////////////////////

///////////////////code 2////////////////////////
app.get('/count-error-emails', (req, res) => {
  countErrorEmails((error, errorEmailCount) => {
    if (error) {
      console.error('Error counting error emails:', error);

      // Check if headers have already been sent before sending an error response
      if (!res.headersSent) {
        res.status(500).json({ error: 'Error counting error emails' });
      }
    } else {
      // Check if headers have already been sent before sending the success response
      if (!res.headersSent) {
        res.json({ count: errorEmailCount });
      }
    }
  });
});

function countErrorEmails(callback) {
  const imap = new Imap(imapConfig);

  imap.once('ready', () => {
    imap.openBox('INBOX', true, (err, box) => {
      if (err) {
        imap.end();
        return callback(err);
      }

      const startDate = new Date();
      startDate.setHours(0, 0, 0, 0);

      const searchCriteria = ['FROM', 'sakthivel@gmail.com'];
      const fetchOptions = { bodies: '', markSeen: false };

      imap.search([['SINCE', startDate], searchCriteria], (searchError, results) => {
        imap.end(); // Always end the IMAP connection

        if (searchError) {
          return callback(searchError);
        }

        const errorEmailCount = results.length;
        callback(null, errorEmailCount);
      });
    });
  });

  imap.once('error', (error) => {
    handleError(error);
  });

  function handleError(error) {
    console.error('IMAP connection error:', error);

    // Check if headers have already been sent before calling callback
    if (!callbackCalled) {
      callbackCalled = true;
      callback(error);
    }
  }

  let callbackCalled = false; // Track whether the callback has been called

  imap.connect();
}


///////////Count the Incoming Error Records/////////////////////////////////////

////////////////////////////////////////////////////Incoming Invoice Box Count part//////////////////











//////// ////My Pdf extarction data stored Mongodb Database Schema////////////////////////////

const emailSchema = new mongoose.Schema({
  subject: String,
  date: Date,
  fromEmail: String,
  toEmail: String,
  filefolder: String,

  attachments: [{
    filename: String,
    contentType: String,
    jsonfilename: String,
    pdfText: String,
  }],
}, { collection: 'GetMailInvoiceDatas' });

const Email = mongoose.model('Email', emailSchema);

//////// ////My Pdf extarction data stored Mongodb Database Schema////////////////////////////


///////////////////////////PDF STORED IN ./data File path Code In Down ////////////////////////////////////////////////
/////You can change the name getmails instead of getmail na should take "pdf click to open" is working you change frontrned also//////////
app.get('/getmail', async (req, res) => {
  console.log('Connection Start');

  const getEmails = async () => {
    try {
      const imap = new Imap(imapConfig);

      imap.once('ready', () => {
        const desiredDate = new Date();
        const searchCriteria = [['ON', desiredDate.toISOString().slice(0, 10)]];

        imap.openBox('INBOX', false, () => {
          imap.search(searchCriteria, async (err, results) => {
            if (err) {
              console.error('Search error:', err);
              imap.end();
              return res.status(500).json({ error: err.message });
            }

            if (results.length === 0) {
              console.log('No messages found.');
              imap.end();
              return res.json([]);
            }

            const f = imap.fetch(results, { bodies: '', struct: true });
            const emails = [];

            f.on('message', (msg) => {
              msg.on('body', (stream) => {
                let buffer = '';
                stream.on('data', (chunk) => buffer += chunk.toString('utf8'));
                stream.on('end', async () => {
                  try {
                    const parsed = await simpleParser(buffer);
                    console.log('Number of attachments:', parsed.attachments.length);

                    const email = {
                      subject: parsed.subject,
                      date: parsed.date ? parsed.date.toLocaleString() : null,
                      fromEmail: parsed.from.value[0].address,
                      toEmail: parsed.to.value[0].address,
                      filefolder: process.cwd().replace(/\\/g, '/'),
                      attachments: [],
                      lineItems: [],
                      vendorName: null,
                      vendorAddress: null,
                      invoiceNo: null,
                      invoiceDate: null,
                      poNo: null,
                      netTotal: null,
                    };

                    if (parsed.attachments && Array.isArray(parsed.attachments)) {
                      await Promise.all(parsed.attachments.map(async (attachment) => {
                        if (attachment && attachment.filename.endsWith('.pdf')) {
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

                          const dataBuffer = fs.readFileSync(pdfFilePath);
                          const pdfData = await pdf(dataBuffer);
                          const pdfText = pdfData.text;
                          attachmentData.pdfText = pdfText;

                          // Extract relevant data from PDF text
                          email.vendorName = extractVendorName(pdfText);
                          email.vendorAddress = extractVendorAddress(pdfText);
                          email.invoiceNo = extractInvoiceNo(pdfText);
                          email.invoiceDate = extractInvoiceDate(pdfText);
                          email.poNo = extractPONo(pdfText);
                          email.netTotal = extractNettotal(pdfText);

                          // Extract line items from PDF text
                          email.lineItems = extractLineItems(pdfText);

                          email.attachments.push(attachmentData);
                        }
                      }));
                    }

                    emails.push(email);
                  } catch (error) {
                    console.error('Error processing email:', error);
                  }
                });
              });
            });

            f.once('error', (ex) => {
              imap.end();
              return res.status(500).json({ error: ex.message });
            });

            f.once('end', async () => {
              imap.end();

              try {
                await Email.insertMany(emails);
                res.json(emails);
              } catch (error) {
                console.error('Error inserting emails:', error);
                res.status(500).json({ error: 'Failed to insert emails' });
              }
            });
          });
        });
      });

      imap.once('error', (err) => {
        res.status(500).json({ error: err.message });
      });

      imap.once('end', () => {
        console.log('Connection ended');
      });

      imap.connect();
    } catch (ex) {
      res.status(500).json({ error: 'An error occurred' });
    }
  };

  // Helper function to extract data using regex pattern
  function extractField(text, pattern) {
    const match = text.match(pattern);
    return match ? match[1].trim() : null;
  }

  // Extract Vendor Name
  
  function extractVendorName(text) {
    // Patterns to match "Entered By:", "Supplier:", and "VENDORNAME:"
    const enteredByPattern = /Entered By:\s*([^\n]+)/;
    const supplierPattern = /Supplier:\s*([^\n]+)/;
    const vendorNamePattern = /VENDORNAME:\s*([^\n]+)/;
    const vendorNamePattern1 = /(?:\n|\r\n)?([A-Z0-9\s]+ - [A-Z\s]+)\s*/;
    const supplieraddress = /SUPPLIER ADDRESS:\s*([^\n]+)/;


    let match = text.match(enteredByPattern);
    if (match) {
        return match[1].trim();
    }
    match = text.match(supplierPattern);
    if (match) {
        return match[1].trim();
    }
    match = text.match(vendorNamePattern);
    if (match) {
      return match[1].trim();
  }
  match = text.match(supplieraddress);
  if (match) {
    return match[1].trim();
}


  match = text.match(vendorNamePattern1);
    return match ? match[1].trim() : null;
}



  // Extract Vendor Address
  function extractVendorAddress(text) {
    const documentNoPattern = /Business Place:\s*([^:\n]+)/;
    const supplierPattern = /Supplier:\s*([^\n]+)\n(?:[^\n]*\n){1,}([^\n]+(?:\n[^\n]+)*)/;
    const billToShippedToPattern = /BilltoShippedTo:[\s\S]*?(\w[\w\s,.-]*\d{6})/;
    const kd = /Document No\.\s*[\n:]*\s*([^\n]*)/i;
    const wipro =  /Supplier address:\s*([\s\S]+?)\s*GSTIN:/;
    const wiAddress = /SUPPLIER ADDRESS:\s*([\s\S]+?)\s*GSTIN:/;


    // Try to match "Business Place:" pattern
    let match = text.match(documentNoPattern);
    if (match) {
        return match[1].trim();
    }

    // Try to match "Supplier:" pattern
    match = text.match(supplierPattern);
    if (match) {
        return match[1].trim();
    }
    match = text.match(billToShippedToPattern);
    if (match) {
      return match[1].trim();
  }
  match = text.match(kd);
  if (match) {
    return match[1].trim();
}
match = text.match(wipro);
if (match) {
  return match[1].trim();
}
match = text.match(wiAddress);
   
    return match ? match[1].trim() : null;
}


  // Extract Invoice No
  
  
  function extractInvoiceNo(text) {
    const inwardNoPattern = /Inward No:\s*(\d+)/;
    const documentNoPattern = /Document No\.\s*:\s*([^\n]+)/;
    const supplierPattern = /Party Inv No:\s*([^\n]+)/i;
      const invoiceNoPattern = /InvoiceNo\.\s*:([\s\S]+?)\n/i;
      const ds = /E-Way Bill No:\s*([\d\s]+)/i;
      const inno = /Invoice No:\s*(\d+)\s*/
      

    
    let match = text.match(inwardNoPattern);
    if (match) {
        return match[1].trim();
    }
    
    match = text.match(documentNoPattern);
    if (match) {
        return match[1].trim();
    }
    
    match = text.match(supplierPattern);
    if (match) {
        return match[1].trim();
    }
    
    match = text.match(invoiceNoPattern);
    if (match) {
      return match[1].trim();
  }
  match = text.match(inno);
  if (match) {
    return match[1].trim();
}
  
  match = text.match(ds);
  
 
   
    return match ? match[1].trim() : null;
}

  // // Extract Invoice Date
  function extractInvoiceDate(text) {
    // Pattern to match "MRN Date:" followed by text until a newline
    const mrnDatePattern = /MRN Date:\s*([^\n]+)/;
    
    // Pattern to match "Document Date:" followed by text until a newline
    const documentNoPattern = /Document Date:\s*([^\n]+)/;
    
    // Pattern to match "Due Date:" followed by digits and periods
    const dueDatePattern = /Due Date:\s*([\d.]+)/;
    
    // Pattern to match "Invoice Date:" followed by text until a newline
    const invoiceDatePattern = /Invoice\s*Date\s*([^\n]+)/i;

    const hdshfh =/Document Date\s*[\n:]*\s*([\d/]+)\s*/i;
    const jd =/Date:\s*([^\n]+)/;

    let match = text.match(mrnDatePattern);
    if (match) {
        return match[1].trim();
    }
    
    match = text.match(documentNoPattern);
    if (match) {
        return match[1].trim();
    }
    match = text.match(jd);
    if (match) {
        return match[1].trim();
    }
    
    match = text.match(dueDatePattern);
    if (match) {
        return match[1].trim();
    }
    
    match = text.match(invoiceDatePattern);
    if (match) {
      return match[1].trim();
  }
  
  
  match = text.match(hdshfh);
    return match ? match[1].trim() : null;
}


  // Extract PO No

function extractPONo(text) {
  const poNoPattern = /Ref No\.\s*:\s*([^\n]+)/;
  const poNoPattern1 = /PONo\.\s*([\d]+)/;
  // const poNoPattern2 = /001269:\s*[\r\n]*([\w\/\-]+)/; 
  const poNoPattern2 =/Purchase Order:\s*[\n:]*\s*([\d/]+)\s*/i;

  let match = text.match(poNoPattern);
  if (match) {
    return match[1].trim();
  }
  match = text.match(poNoPattern1);

  match = text.match(poNoPattern2);
  if (match) {
    return match[1].trim();
  }
  return match ? match[1].trim() : null;
}

  





  function extractNettotal(text) {
    // Define regex patterns for extracting the total amount
    const enteredByPattern = /Net Payable amount:\s*([\d,]+\.\d{2})/;
    const supplierPattern = /Total\s+Amount\s*([\d,.]+)/;
    const netTotalPattern = /(?:Total\s*([\d,.]+))/;
  
    let match = text.match(enteredByPattern);
    if (match) {
      return match[1].trim();
    }
  
    // Attempt to match the second pattern
    match = text.match(supplierPattern);
    if (match) {
      return match[1].trim();
    }
  
    // Attempt to match the third pattern for Net Total
    match = text.match(netTotalPattern);
    return match ? match[1].trim() : null;
  }
  

  // Extract line items from text
  function extractLineItems(text) {
    const lineItemRegex = /(\d{8,})[\s\S]*?([\d,.]+)[\s\S]*?([\d,.]+)[\s\S]*?(?:Brigade Plus[\s\S]*?)?([\d,.]+)(?:\s*EA|$)/g;
   

    const accountDescriptionRegex = /(\d{8,})\s*([^\n]+)/g;

    // Extract line items using regex pattern
    const lineItems = [];
    let match;
    while ((match = lineItemRegex.exec(text)) !== null) {
      let accountDescriptionMatch = accountDescriptionRegex.exec(text);
      const description = accountDescriptionMatch ? accountDescriptionMatch[2].trim() : match[0].replace(/\d{8,}/g, '').trim();
      const quantity = match[4].replace(/\d{8,}/g, '').trim();
      // const price = match[2];
      const price = match[3].trim();

      const rate = null; // If rate is not available, set as null
      const discount = null; // If discount is not available, set as null
      const subTotal = null; // If subTotal is not available, set as null

      lineItems.push({
        description,
        quantity,
        rate,
        price,
        discount,
        subTotal,
      });
    }
    return lineItems;
  }

  await getEmails();
});

// const port = 8081;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

