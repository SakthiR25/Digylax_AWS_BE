// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./Db/db');
// const { Layoutoptions } = require('./Models/Layout'); 

// const app = express();
// // const port = 8089;
// const port = process.env.PORT || 8089;

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

// app.post("/api/layoutoption", async (req, res) => {
//     try {
//         const { option, value } = req.body;
        
//         const pdfcustom = new Layoutoptions({ option, value });
//         const result = await pdfcustom.save();

//         res.status(200).json({ message: "Saved successfully", result });
//     } catch (error) {
//         res.status(500).json({
//             error: "Error while saving the layout option",
//             message: error.message,
//         });
//     }
// });

// app.get("/api/layoutoption", async (req, res) => {
//     try {
//         const layoutOptions = await Layoutoptions.find();
//         res.status(200).json(layoutOptions);
//     } catch (error) {
//         res.status(500).json({
//             error: "Error while fetching layout options",
//             message: error.message,
//         });
//     }
// });

// app.get('/api/layoutoption/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const layoutOption = await Layoutoptions.findById(id);

//         if (!layoutOption) {
//             return res.status(404).json({ message: 'Layout option not found' });
//         }

//         res.status(200).json(layoutOption);
//     } catch (error) {
//         res.status(500).json({
//             error: "Error while fetching the layout option",
//             message: error.message,
//         });
//     }
// });

// app.put('/api/layoutoption/:id', async (req, res) => { 
//     try {
//         const id = req.params.id;
//         const updatedData = req.body;
//         const options = { new: true };

//         const result = await Layoutoptions.findByIdAndUpdate(id, updatedData, options);
//         if (!result) {
//             return res.status(404).json({ message: "Layout option not found" });
//         }

//         res.status(200).json({ message: "Layout option updated successfully", result });
//     } catch (error) {
//         res.status(500).json({
//             error: "Error while updating the layout option",
//             message: error.message,
//         });
//     }
// });

// app.delete('/api/layoutoption/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const result = await Layoutoptions.findByIdAndDelete(id);

//         if (!result) {
//             return res.status(404).json({ message: "Layout option not found" });
//         }

//         res.status(200).json({ message: "Layout option deleted successfully" });
//     } catch (error) {
//         res.status(500).json({
//             error: "Error while deleting the layout option",
//             message: error.message,
//         });
//     }
// });

// app.listen(port, () => {
//     // console.log(`Server running on port ${port}`);
// });














const express = require('express');
const router = express.Router();
const { Layoutoptions } = require('./Models/Layout'); // Adjust path as necessary

// Route to save a new layout option
router.post("/layoutoption", async (req, res) => {
    try {
        const { option, value } = req.body;
        const pdfcustom = new Layoutoptions({ option, value });
        const result = await pdfcustom.save();
        res.status(200).json({ message: "Saved successfully", result });
    } catch (error) {
        res.status(500).json({
            error: "Error while saving the layout option",
            message: error.message,
        });
    }
});

// Route to get all layout options
router.get("/layoutoption", async (req, res) => {
    try {
        const layoutOptions = await Layoutoptions.find();
        res.status(200).json(layoutOptions);
    } catch (error) {
        res.status(500).json({
            error: "Error while fetching layout options",
            message: error.message,
        });
    }
});

// Route to get a specific layout option by ID
router.get('/layoutoption/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const layoutOption = await Layoutoptions.findById(id);
        if (!layoutOption) {
            return res.status(404).json({ message: 'Layout option not found' });
        }
        res.status(200).json(layoutOption);
    } catch (error) {
        res.status(500).json({
            error: "Error while fetching the layout option",
            message: error.message,
        });
    }
});

// Route to update a layout option by ID
router.put('/layoutoption/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        const result = await Layoutoptions.findByIdAndUpdate(id, updatedData, options);
        if (!result) {
            return res.status(404).json({ message: "Layout option not found" });
        }
        res.status(200).json({ message: "Layout option updated successfully", result });
    } catch (error) {
        res.status(500).json({
            error: "Error while updating the layout option",
            message: error.message,
        });
    }
});

// Route to delete a layout option by ID
router.delete('/layoutoption/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Layoutoptions.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: "Layout option not found" });
        }
        res.status(200).json({ message: "Layout option deleted successfully" });
    } catch (error) {
        res.status(500).json({
            error: "Error while deleting the layout option",
            message: error.message,
        });
    }
});

module.exports = router;
