// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./Db/db');
// const { InvoiceLayout } = require('./Models/InvoiceLayout'); 

// const app = express();
// // const port = 8088;
// const port = process.env.PORT || 8088;

// connectDB();

// // Middleware   
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  
//     credentials: true,  
//     optionsSuccessStatus: 204,
//     allowedHeaders: 'Content-Type,Authorization',
// }));
// app.use(express.json()); 

// app.post("/saveInvoice", async (req, res) => {
//     try {
//         const {
//             InvoiceNo,
//             InvoiceDate,
//             PoNo,
//             PoDate,
//             Description,
//             Quantity,
//             Unitprice,
//             Total,
//             Discount,
//             SubTotal,
//             Gst,
//             Tax,
//             NetAmount,
//             Remarks,
//         } = req.body;
        
//         const pdfcustom = new InvoiceLayout({ 
//             InvoiceNo,
//             InvoiceDate,
//             PoNo,
//             PoDate,
//             Description,
//             Quantity,
//             Unitprice,
//             Total,
//             Discount,
//             SubTotal,
//             Gst,
//             Tax,
//             NetAmount,
//             Remarks,
//         });
  
//         const result = await pdfcustom.save();
//         res.status(200).json({ message: "saved successfully", result });
//     } catch (error) {
//         res.status(500).json({
//             error: "while saving the pdfcustom",
//             message: error.message,
//         });
//     }
// });


// app.get("/getdata", async (req, res) => {
//     try {
//         const invoices = await InvoiceLayout.find();
//         res.status(200).json(invoices);
//     } catch (error) {
//         res.status(500).json({
//             error: "while fetching invoices",
//             message: error.message,
//         });
//     }
// });

// app.get('/programmer/:id', async (req, res) => {
//     var id = req.params.id
//     let invoice = ''
//     try {
//         invoice = await InvoiceLayout.findById(id) 
//         if (invoice == null) {
//             return res.status(404).json({ message: 'Cannot find programmer' })
//         }
//     } catch (err) {
//         return res.status(500).json({ message: err.message })
//     }

//     res.send(invoice) 
// });


// app.put('/updateInvoice/:id', async (req, res) => { 
//     try {
//         const id = req.params.id;
//         const updatedData = req.body;
//         const options = { new: true };

//         const result = await InvoiceLayout.findByIdAndUpdate(id, updatedData, options);
//         if (!result) {
//             return res.status(404).json({ message: "Invoice not found" });
//         }
//         res.status(200).json({ message: "Invoice updated successfully", result });
//     } catch (error) {
//         res.status(500).json({
//             error: "while updating the invoice",
//             message: error.message,
//         });
//     } 
// });

// app.delete('/deleteInvoice/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const result = await InvoiceLayout.findByIdAndDelete(id);
//         if (!result) {
//             return res.status(404).json({ message: "Invoice not found" });
//         }
//         res.status(200).json({ message: "Invoice deleted successfully" });
//     } catch (error) {
//         res.status(500).json({
//             error: "while deleting the invoice",
//             message: error.message,
//         });
//     }
// });

// app.listen(port, () => {
//     // console.log(`Server running on port ${port}`);
// });







// ./routes/invoiceRoutes.js
const express = require('express');
const router = express.Router();
const { InvoiceLayout } = require('./Models/InvoiceLayout'); // Adjust path as necessary

// Route to save a new invoice
router.post("/saveInvoice", async (req, res) => {
    try {
        const {
            InvoiceNo,
            InvoiceDate,
            PoNo,
            PoDate,
            Description,
            Quantity,
            Unitprice,
            Total,
            Discount,
            SubTotal,
            Gst,
            Tax,
            NetAmount,
            Remarks,
        } = req.body;

        const pdfcustom = new InvoiceLayout({ 
            InvoiceNo,
            InvoiceDate,
            PoNo,
            PoDate,
            Description,
            Quantity,
            Unitprice,
            Total,
            Discount,
            SubTotal,
            Gst,
            Tax,
            NetAmount,
            Remarks,
        });

        const result = await pdfcustom.save();
        res.status(200).json({ message: "saved successfully", result });
    } catch (error) {
        res.status(500).json({
            error: "while saving the pdfcustom",
            message: error.message,
        });
    }
});

// Route to get all invoices
router.get("/getdata", async (req, res) => {
    try {
        const invoices = await InvoiceLayout.find();
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({
            error: "while fetching invoices",
            message: error.message,
        });
    }
});

// Route to get a specific invoice by ID
router.get('/programmer/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const invoice = await InvoiceLayout.findById(id);
        if (!invoice) {
            return res.status(404).json({ message: 'Cannot find invoice' });
        }
        res.status(200).json(invoice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route to update an invoice by ID
router.put('/updateInvoice/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await InvoiceLayout.findByIdAndUpdate(id, updatedData, options);
        if (!result) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        res.status(200).json({ message: "Invoice updated successfully", result });
    } catch (error) {
        res.status(500).json({
            error: "while updating the invoice",
            message: error.message,
        });
    }
});

// Route to delete an invoice by ID
router.delete('/deleteInvoice/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await InvoiceLayout.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        res.status(200).json({ message: "Invoice deleted successfully" });
    } catch (error) {
        res.status(500).json({
            error: "while deleting the invoice",
            message: error.message,
        });
    }
});

module.exports = router;
