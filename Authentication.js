// // ////////////////Date 02/08/2024 code///////////////////////////////

// // const express = require('express');
// // const mongoose = require('mongoose');
// // const bcrypt = require('bcrypt');
// // const bodyParser = require('body-parser');
// // const session = require('express-session');
// // const crypto = require('crypto');
// // const jwt = require('jsonwebtoken');
// // const cors = require("cors");

// // const app = express(); // Initialize app here

// // // My Load environment variables or use default values
// // const PORT = process.env.PORT || 8084;
// // const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://sakthivel:sakthi@cluster0.dconihp.mongodb.net/OCRHorizon';
// // const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');
// // const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');

// // // Configure Express
// // app.use(cors()); // Use cors after initializing app
// // app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(bodyParser.json());
// // app.use(session({
// //   secret: SESSION_SECRET,
// //   resave: false,
// //   saveUninitialized: true
// // }));

// // //My MongoDB Connections
// // if (mongoose.connection.readyState === 0) {
// //   mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// //   mongoose.connection.on('error', (err) => {
// //     console.error(`MongoDB connection error: ${err}`);
// //     process.exit(-1);
// //   });
// // }

// // // Models
// // const User = mongoose.model('User', {
// //   name: { type: String, required: true },
// //   email: { type: String, unique: true, required: true },
// //   username: { type: String, unique: true, required: true },
// //   password: { type: String, required: true },
// //   role: { type: String, enum: ['superadmin', 'admin', 'user'], default: 'user' } // Add role field
// // }, 'Logindatas');

// // // My Registration PART
// // app.post('/register', async (req, res) => {
// //   try {
// //     const { name, email, username, password, role } = req.body;

// //     // Validate input
// //     if (!name || !email || !username || !password) {
// //       return res.status(400).send('All fields are required.');
// //     }

// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     const newUser = new User({
// //       name,
// //       email,
// //       username,
// //       password: hashedPassword,
// //       role // Assign role
// //     });

// //     await newUser.save();
// //     res.status(201).send('User registered successfully.');
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).send('Internal Server Error');
// //   }
// // });

// // // My Login PART
// // app.post('/login', async (req, res) => {
// //   try {
// //     const { username, password } = req.body;
// //     const user = await User.findOne({ username });

// //     if (!user) {
// //       console.log('User not found');
// //       return res.status(401).send('Invalid username or password');
// //     }

// //     const passwordMatch = await bcrypt.compare(password, user.password);

// //     if (!passwordMatch) {
// //       console.log('Password does not match');
// //       return res.status(401).send('Invalid username or password');
// //     }

// //     // My Generate JWT token
// //     const token = jwt.sign({ userId: user._id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

// //     res.json({ message: 'Login successful', token });
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).send('Internal Server Error');
// //   }
// // });

// // // My Logout PART
// app.post('/logout', (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send('Internal Server Error');
//     }
//     res.send('Logout successful');
//   });
// }); 

// // // My Reset Password PART
// // app.post('/reset-password', async (req, res) => {
// //   try {
// //     const { email, newPassword } = req.body;

// //     // Validate input
// //     if (!email || !newPassword) {
// //       return res.status(400).send('Email and new password are required.');
// //     }

// //     // Check if the user with the provided email exists
// //     const user = await User.findOne({ email });

// //     if (!user) {
// //       return res.status(404).send('User not found.');
// //     }

// //     // Update the user's password
// //     const hashedPassword = await bcrypt.hash(newPassword, 10);
// //     user.password = hashedPassword;
// //     await user.save();

// //     res.status(200).send('Password reset successful.');
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).send('Internal Server Error');
// //   }
// // });

// // app.listen(PORT, () => {
// //   // console.log(`Server is running on port ${PORT}`);
// // });
// // ////////////////Date 02/08/2024 code///////////////////////////////















// ////////////////Date 02/08/2024 code///////////////////////////////
// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const crypto = require('crypto');
// const jwt = require('jsonwebtoken');

// const router = express.Router(); // Initialize the router

// // Configuration variables
// const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');
// const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');

// // User Model
// const User = mongoose.model('User', {
//   name: { type: String, required: true },
//   email: { type: String, unique: true, required: true },
//   username: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['superadmin', 'admin', 'user'], default: 'user' }, // Add role field
// }, 'Logindatas');

// // Registration Route
// router.post('/register', async (req, res) => {
//   try {
//     const { name, email, username, password, role } = req.body;

//     // Validate input
//     if (!name || !email || !username || !password) {
//       return res.status(400).send('All fields are required.');
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name,
//       email,
//       username,
//       password: hashedPassword,
//       role // Assign role
//     });

//     await newUser.save();
//     res.status(201).send('User registered successfully.');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// // Login Route
// router.post('/login', async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });

//     if (!user) {
//       console.log('User not found');
//       return res.status(401).send('Invalid username or password');
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       console.log('Password does not match');
//       return res.status(401).send('Invalid username or password');
//     }

//     // My Generate JWT token
//     const token = jwt.sign({ userId: user._id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

//     res.json({ message: 'Login successful', token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// // Logout Route
// router.post('/logout', (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send('Internal Server Error');
//     }
//     res.send('Logout successful');
//   });
// });

// // Reset Password Route
// router.post('/reset-password', async (req, res) => {
//   try {
//     const { email, newPassword } = req.body;

//     // Validate input
//     if (!email || !newPassword) {
//       return res.status(400).send('Email and new password are required.');
//     }

//     // Check if the user with the provided email exists
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).send('User not found.');
//     }

//     // Update the user's password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;
//     await user.save();

//     res.status(200).send('Password reset successful.');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// module.exports = router;









const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const router = express.Router(); // Initialize the router

// Configuration variables
const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');
const JWT_SECRET = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');

// User Model
const User = mongoose.model('User', {
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['superadmin', 'admin', 'user'], default: 'user' }, // Add role field
}, 'Logindatas');

// Registration Route
router.post('/register', async (req, res) => {
  try {
    const { name, email, username, password, role } = req.body;

    // Validate input
    if (!name || !email || !username || !password) {
      return res.status(400).send('All fields are required.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
      role // Assign role
    });

    await newUser.save();
    res.status(201).send('User registered successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      console.log('User not found');
      return res.status(401).send('Invalid username or password');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.log('Password does not match');
      return res.status(401).send('Invalid username or password');
    }

    // My Generate JWT token
    const token = jwt.sign({ userId: user._id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Logout Route
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
    res.send('Logout successful');
  });
});
// 
// Reset Password Route
router.post('/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Validate input
    if (!email || !newPassword) {
      return res.status(400).send('Email and new password are required.');
    }

    // Check if the user with the provided email exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send('User not found.');
    }

    // Update the user's password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send('Password reset successful.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;