// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect('mongodb+srv://sakthivel:sakthi@cluster0.dconihp.mongodb.net/Tabdatas', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log('MongoDB connected');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
const mongoose = require('mongoose');

const connectDB = async () => {
  if (mongoose.connection.readyState !== 0) { 
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    await mongoose.connect('mongodb+srv://sakthivel:sakthi@cluster0.dconihp.mongodb.net/POvendordata', {
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
