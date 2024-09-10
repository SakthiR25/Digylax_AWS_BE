// MY sapIntegration

const axios = require('axios');

function generateCsrfToken() {
  // Replace this with your logic to generate a CSRF token
  return 'your_csrf_token_logic';
}

async function getSapCsrfToken() {
  try {
    const csrfTokenResponse = await axios.get(
      'http://115.240.201.116:8022/sap/opu/odata/sap/ZAPI_VENDOR_SRV_01/',
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

    return csrfTokenResponse.headers['x-csrf-token'];
  } catch (error) {
    console.error('Error getting CSRF token from SAP:', error);
    throw error;
  }
}

async function postToSap(originalData, extractedData) {
  try {
    const csrfToken = await getSapCsrfToken();

    if (!csrfToken) {
      console.error('CSRF token not available');
      throw new Error('CSRF token not available');
    }

    const serverIntegrationEndpoint =
      'http://115.240.201.116:8022/sap/opu/odata/sap/ZAPI_VENDOR_SRV_01/PO_HEADERSet';

    const requestData = {
      originalData: originalData,
      extractedData: extractedData,
    };

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

    return response;
  } catch (error) {
    console.error('Error posting data to SAP:', error);
    throw error;
  }
}

module.exports = {
  generateCsrfToken,
  postToSap,
};




// const express = require('express');
// const axios = require('axios');

// const app = express();
// const port = 8081;

// const username = 'CQT_BTP';
// const password = 'Synozon@1234';
// const odataUrl = 'https://bed.sap.brigadegroup.com/sap/opu/odata/sap/MM_PUR_PO_MAINTAIN?$format=json ';
// const POURL = 'https://bed.sap.brigadegroup.com/sap/opu/odata/sap/MM_PUR_PO_MAINTAIN/F4TaxCodes?$format=json'
// const F4functionalarea='https://bed.sap.brigadegroup.com/sap/opu/odata/sap/MM_PUR_PO_MAINTAIN/F4FunctionalAreas?$format=json'

// const auth = Buffer.from(`${username}:${password}`).toString('base64');


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

// app.get('/enttydata', (req, res) => {
//   axios.get(POURL, {
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



  






// const express = require('express');
// const axios = require('axios');

// const app = express();
// const port = 8081;

// const username = 'CQT_BTP';
// const password = 'Synozon@1234';
// const odataUrl = 'https://bed.sap.brigadegroup.com/sap/opu/odata/sap/MM_PUR_PO_MAINTAIN?$format=json ';
// const POURL = 'https://bed.sap.brigadegroup.com/sap/opu/odata/sap/MM_PUR_PO_MAINTAIN/F4TaxCodes?$format=json'
// const F4functionalarea='https://bed.sap.brigadegroup.com/sap/opu/odata/sap/MM_PUR_PO_MAINTAIN/F4FunctionalAreas?$format=json'

// const auth = Buffer.from(`${username}:${password}`).toString('base64');
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

// app.get('/enttydata', (req, res) => {
//   axios.get(POURL, {
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



  





