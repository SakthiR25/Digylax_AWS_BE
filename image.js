
/////////////////////back up code///////////////////////////////////


// const express = require("express");
// const multer = require("multer");
// const mongoose = require("mongoose");
// const path = require("path");
// const fs = require('fs'); // Add this line

// const app = express();
// const port = 8082;

// const cors = require("cors");
// app.use(cors());



// // Connect to MongoDB
// mongoose.connect("mongodb+srv://sakthivel:sakthi@cluster0.dconihp.mongodb.net/imageUploader", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const imageSchema = new mongoose.Schema({
//   filename: String,
//   originalname: String,
//   path: String,
//   data: String, // Add a field to store Base64-encoded image data
// });


// // Create a model based on the schema
// const Image = mongoose.model("Image", imageSchema);

// // Set up multer storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// // Create multer instance with storage configuration
// const upload = multer({ storage: storage });

// // Serve uploaded images statically
// app.use("/uploads", express.static("uploads"));

// app.post("/api/upload", upload.single("image"), async (req, res) => {
//   try {
//     const file = req.file;

//     if (!file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     // Read the image file and convert to Base64
//     const imageBuffer = fs.readFileSync(file.path);
//     const imageBase64 = imageBuffer.toString("base64");

//     const newImage = new Image({
//       filename: file.filename,
//       originalname: file.originalname,
//       path: file.path,
//       data: imageBase64, // Save the Base64-encoded image data
//     });

//     await newImage.save();

//     return res.status(200).json({ message: "File uploaded successfully", file });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });
// app.get("/api/images", async (req, res) => {
//   try {
//     // Fetch all images from the database
//     const images = await Image.find();

//     // Decode Base64 and send images as a response
//     const imagesWithBase64 = images.map(image => ({
//       ...image._doc,
//       data: image.data ? Buffer.from(image.data, 'base64').toString() : undefined,
//     }));

//     return res.status(200).json({ images: imagesWithBase64 });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });





// // ... (existing code)

// app.delete("/api/images/:id", async (req, res) => {
//   try {
//     const imageId = req.params.id;

//     // Find the image by ID
//     const image = await Image.findById(imageId);

//     if (!image) {
//       return res.status(404).json({ error: "Image not found" });
//     }

//     // Delete the image file from the uploads directory
//     fs.unlinkSync(image.path);

//     // Delete the image record from the database
//     await Image.findByIdAndDelete(imageId);

//     return res.status(200).json({ message: "Image deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });








// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });


// /////////////////////back up code///////////////////////////////////



//////////////////////This Logo Part///////////////////

const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const path = require("path");
const fs = require('fs'); // Add this line

const app = express();
// const port = 8082;
const port = process.env.PORT || 8082;

const cors = require("cors");
app.use(cors());



// Connect to MongoDB
mongoose.connect("mongodb+srv://sakthivel:sakthi@cluster0.dconihp.mongodb.net/imageUploader", {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});
const imageSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  path: String,
  data: String, // Add a field to store Base64-encoded image data
});


// Create a model based on the schema
const Image = mongoose.model("Image", imageSchema);

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Create multer instance with storage configuration
const upload = multer({ storage: storage });

// Serve uploaded images statically
app.use("/uploads", express.static("uploads"));

app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Read the image file and convert to Base64
    const imageBuffer = fs.readFileSync(file.path);
    const imageBase64 = imageBuffer.toString("base64");

    const newImage = new Image({
      filename: file.filename,
      originalname: file.originalname,
      path: file.path,
      data: imageBase64, // Save the Base64-encoded image data
    });

    await newImage.save();

    return res.status(200).json({ message: "File uploaded successfully", file });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/api/images", async (req, res) => {
  try {
    // Fetch all images from the database
    const images = await Image.find();

    // Decode Base64 and send images as a response
    const imagesWithBase64 = images.map(image => ({
      ...image._doc,
      data: image.data ? Buffer.from(image.data, 'base64').toString() : undefined,
    }));

    return res.status(200).json({ images: imagesWithBase64 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});





////////////////////////////////////////////Delete Api////////////////////////////////////////////

app.delete("/api/images/:id", async (req, res) => {
  try {
    const imageId = req.params.id;

    // Find the image by ID
    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Delete the image file from the uploads directory
    fs.unlinkSync(image.path);

    // Delete the image record from the database
    await Image.findByIdAndDelete(imageId);

    return res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});








// Start the server
app.listen(port, () => {
  // console.log(`Server is running on http://localhost:${port}`);
});

