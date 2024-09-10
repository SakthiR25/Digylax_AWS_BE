
// ./getmaltesting.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./Db/db'); // Adjust path as necessary
const invoiceLayout = require('./Invoicelayout'); // Import routes
const Layout = require('./Layout'); // Import routes
const Tabdata = require('./Tabdata')
const sappointegration = require('./sappointegration')
const Base664file = require('./pdfbase64')
const Authentication = require('./Authentication') 
const Logo = require('./image') 
// const getinvoice = require('./getinvoice')
const app = express();
const port = process.env.PORT || 2026;

connectDB(); // Ensure this is called once

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',  ///put the your frontend Url
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type,Authorization',
}));
app.use(express.json());

// Use routes
app.use('/api', invoiceLayout); 

/////Layout routes

app.use('/Layout', Layout); 

/////Tabdata

app.use('/Tabledata', Tabdata); 

/////sappointegration
app.use('/sappo', sappointegration); 

/////Base64

app.use('/base64', Base664file); 

/////Authentication 
app.use('/Auth', Authentication); 


//////imageLogo
// app.use('/Logo', Logo); 

app.get('/', (req, res) => res.json('The All API is Running'));


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});



