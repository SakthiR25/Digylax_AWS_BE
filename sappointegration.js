//////Backup code onecErro replace this Top code

// const express = require('express');
// const axios = require('axios');

// const app = express();
// const port = 8085;
// const cors = require('cors');


// const username = 'CQT_BTP';
// const password = 'Synozon@1234';
// const odataUrl = 'https://bed.sap.brigadegroup.com/sap/opu/odata/sap/MM_PUR_PO_MAINTAIN?$format=json ';
// const POURL = 'https://bed.sap.brigadegroup.com/sap/opu/odata/sap/MM_PUR_PO_MAINTAIN/F4TaxCodes?$format=json'
// const F4functionalarea='https://bed.sap.brigadegroup.com/sap/opu/odata/sap/MM_PUR_PO_MAINTAIN/F4FunctionalAreas?$format=json'

// const auth = Buffer.from(`${username}:${password}`).toString('base64');
// app.use(cors({
//     origin: 'http://localhost:3000', 
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     optionsSuccessStatus: 204,
//     allowedHeaders: 'Content-Type,Authorization',
// }));
// app.get('/AllOdata', (req, res) => {
//   axios.get(odataUrl, {
//     headers: {
//       'Authorization': `Basic ${auth}`
//     }
//   })
//   .then(response => {
//     res.json(response.data);
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//     res.status(500).send('Error fetching data');
//   });
// });

// // app.get('/enttydata', (req, res) => {
// //   axios.get(POURL, {
// //     headers: {
// //       'Authorization': `Basic ${auth}`
// //     }
// //   })
// //   .then(response => {
// //     res.json(response.data);
// //   })
// //   .catch(error => {
// //     console.error('Error fetching data:', error);
// //     res.status(500).send('Error fetching data');
// //   });
// // });

// app.get('/F4Taxdata', (req, res) => {
//     axios.get(POURL, {
//       headers: {
//         'Authorization': `Basic ${auth}`
//       }
//     })
//     .then(response => {
//       const filteredData = response.data.d.results.map(item => ({
//         TaxCalculationProcedure: item.TaxCalculationProcedure,
//         TaxCode: item.TaxCode,
//         TaxCodeName: item.TaxCodeName
//       }));
//       res.json(filteredData);
//     })
//     .catch(error => {
//       console.error('Error fetching data:', error);
//       res.status(500).send('Error fetching data');
//     });
//   });
  

// app.get('/F4Functionalarea', (req, res) => {
//   axios.get(F4functionalarea, {
//     headers: {
//       'Authorization': `Basic ${auth}`
//     }
//   })
//   .then(response => {
//     res.json(response.data);
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//     res.status(500).send('Error fetching data');
//   });
// });




// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

//////Backup code onecErro replace this Top code

  





// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// const connectDB = require('./Db/db');
// const { TaxData, UnitOfMeasure, FunctionalArea,Companycodes } = require('./Models/pomodels');


// const app = express();
// // const port = 8085;
// const port = process.env.PORT || 8085;

// const username = 'CQT_BTP';
// const password = 'Synozon@1234';
// const odataUrl = 'https://bed.sap.brigadegroup.com/sap/opu/odata/sap/MM_PUR_PO_MAINTAIN?$format=json';
// const POURL = 'https://bed.sap.brigadegroup.com/sap/opu/odata/sap/MM_PUR_PO_MAINTAIN/F4TaxCodes?$format=json';
// const F4functionalarea = 'https://bed.sap.brigadegroup.com/sap/opu/odata/sap/MM_PUR_PO_MAINTAIN/F4FunctionalAreas?$format=json';
// //const Unitofmeasure = 'https://bed.sap.brigadegroup.com/sap/opu/odata/sap/MM_PUR_PO_MAINTAIN/VHUnitOfMeasures?$format=json';
// const Companycodess = 'https://bed.sap.brigadegroup.com/sap/opu/odata/sap/MM_PUR_PO_MAINTAIN/VHCompanyCodes?$format=json'
// const GRN ='https://bed.sap.brigadegroup.com/sap/opu/odata/sap/MMIM_MATDOC_OV_SRV/F_Mmim_Reasonc_Vh?$format=json'
// const auth = Buffer.from(`${username}:${password}`).toString('base64');

// // Connect to MongoDB
// connectDB();

// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
//   optionsSuccessStatus: 204,
//   allowedHeaders: 'Content-Type,Authorization',
// }));

// app.get('/AllOdata', (req, res) => {
//   axios.get(odataUrl, {
//     headers: {
//       'Authorization': `Basic ${auth}`
//     }
//   })
//   .then(response => {
//     res.json(response.data);
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//     res.status(500).send('Error fetching data');
//   });
// });

// app.get('/F4Taxdata', async (req, res) => {
//   try {
//     const response = await axios.get(POURL, {
//       headers: {
//         'Authorization': `Basic ${auth}`
//       }
//     });

//     const filteredData = response.data.d.results.map(item => ({
//       TaxCalculationProcedure: item.TaxCalculationProcedure,
//       TaxCode: item.TaxCode,
//       TaxCodeName: item.TaxCodeName
//     }));

//     await TaxData.insertMany(filteredData);
//     res.json(filteredData);
//   } catch (error) {
//     console.error('Error fetching or saving data:', error);
//     res.status(500).send('Error fetching or saving data');
//   }
// });


// // app.get('/Unitofmeasure', async (req, res) => {
// //   try {
// //     const response = await axios.get(Unitofmeasure, {
// //       headers: {
// //         'Authorization': `Basic ${auth}`
// //       }
// //     });

// //     const filteredData = response.data.d.results.map(item => ({
// //       UnitOfMeasure: item.UnitOfMeasure,
// //       Description: item.Description
// //     }));

// //     await UnitOfMeasure.insertMany(filteredData);
// //     res.json(filteredData);
// //   } catch (error) {
// //     console.error('Error fetching or saving data:', error);
// //     res.status(500).send('Error fetching or saving data');
// //   }
// // });

// app.get('/F4Functionalarea', async (req, res) => {
//   try {
//     const response = await axios.get(F4functionalarea, {
//       headers: {
//         'Authorization': `Basic ${auth}`
//       }
//     });

//     const filteredData = response.data.d.results.map(item => ({
//       FunctionalArea: item.FunctionalArea,  
//       FunctionalAreaName: item.FunctionalAreaName
//     }));

//     await FunctionalArea.insertMany(filteredData);
//     res.json(filteredData);
//   } catch (error) {
//     console.error('Error fetching or saving data:', error);
//     res.status(500).send('Error fetching or saving data');
//   }
// });




// app.get('/Companycodess', async (req, res) => {
//   try {
//     const response = await axios.get(Companycodess, {
//       headers: {
//         'Authorization': `Basic ${auth}`
//       }
//     });

//     const filteredData = response.data.d.results.map(item => ({
//       ID:item.ID,
//       CompanyCode: item.CompanyCode,  
//       CompanyCodeName: item.CompanyCodeName,
//       Supplier:item.Supplier,
//       cnt:item.cnt
//     }));

//     await Companycodes.insertMany(filteredData);
//      res.json(filteredData);
//   } catch (error) {
//     console.error('Error fetching or saving data:', error);
//     res.status(500).send('Error fetching or saving data');
//   }
// });


// /////////GRN screen

// app.get('/GRN', (req, res) => {
//   axios.get(GRN, {
//     headers: {
//       'Authorization': `Basic ${auth}`
//     }
//   })
//   .then(response => {
//     res.json(response.data);
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//     res.status(500).send('Error fetching data');
//   });
// });

// ///////GRN screen








// app.listen(port, () => {
//   // console.log(`Server is running on http://localhost:${port}`);
// });



const express = require('express');
const axios = require('axios');
const { TaxData, UnitOfMeasure, FunctionalArea, Companycodes } = require('./Models/pomodels');
// const app = express();
const router = express.Router();


const username = process.env.SAP_USERNAME || 'CQT_BTP';
const password = process.env.SAP_PASSWORD || 'Synozon@1234';
const odataUrl = 'https://bed.sap.brigadegroup.com/sap/opu/odata/sap/MM_PUR_PO_MAINTAIN?$format=json';
const POURL = 'https://bed.sap.brigadegroup.com/sap/opu/odata/sap/MM_PUR_PO_MAINTAIN/F4TaxCodes?$format=json';
const F4functionalarea = 'https://bed.sap.brigadegroup.com/sap/opu/odata/sap/MM_PUR_PO_MAINTAIN/F4FunctionalAreas?$format=json';
const Companycodess = 'https://bed.sap.brigadegroup.com/sap/opu/odata/sap/MM_PUR_PO_MAINTAIN/VHCompanyCodes?$format=json';
const GRN = 'https://bed.sap.brigadegroup.com/sap/opu/odata/sap/MMIM_MATDOC_OV_SRV/F_Mmim_Reasonc_Vh?$format=json';
const auth = Buffer.from(`${username}:${password}`).toString('base64');

// GET All OData
router.get('/AllOdata', (req, res) => {
  axios.get(odataUrl, {
    headers: {
      'Authorization': `Basic ${auth}`
    }
  })
  .then(response => {
    res.json(response.data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  });
});

// GET F4Taxdata
router.get('/F4Taxdata', async (req, res) => {
  try {
    const response = await axios.get(POURL, {
      headers: {
        'Authorization': `Basic ${auth}`
      }
    });

    const filteredData = response.data.d.results.map(item => ({
      TaxCalculationProcedure: item.TaxCalculationProcedure,
      TaxCode: item.TaxCode,
      TaxCodeName: item.TaxCodeName
    }));

    await TaxData.insertMany(filteredData);
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching or saving data:', error);
    res.status(500).send('Error fetching or saving data');
  }
});

// GET F4FunctionalArea
router.get('/F4Functionalarea', async (req, res) => {
  try {
    const response = await axios.get(F4functionalarea, {
      headers: {
        'Authorization': `Basic ${auth}`
      }
    });

    const filteredData = response.data.d.results.map(item => ({
      FunctionalArea: item.FunctionalArea,  
      FunctionalAreaName: item.FunctionalAreaName
    }));

    await FunctionalArea.insertMany(filteredData);
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching or saving data:', error);
    res.status(500).send('Error fetching or saving data');
  }
});

// GET CompanyCodes
router.get('/companycodes', async (req, res) => {
  try {
    const response = await axios.get(Companycodess, {
      headers: {
        'Authorization': `Basic ${auth}`
      }
    });

    const filteredData = response.data.d.results.map(item => ({
      ID: item.ID,
      CompanyCode: item.CompanyCode,  
      CompanyCodeName: item.CompanyCodeName,
      Supplier: item.Supplier,
      cnt: item.cnt
    }));

    await Companycodes.insertMany(filteredData);
    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching or saving data:', error);
    res.status(500).send('Error fetching or saving data');
  }
});

// GET GRN
router.get('/GRN', (req, res) => {
  axios.get(GRN, {
    headers: {
      'Authorization': `Basic ${auth}`
    }
  })
  .then(response => {
    res.json(response.data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  });
});

module.exports = router;
