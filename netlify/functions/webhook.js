const express = require('express');
const serverless = require('serverless-http');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
    const alert = req.body;
    console.log('Received Grafana alert:', alert);

    // Handle the alert data here

    res.status(200).send({ status: 'received' });
});

// Export as a Netlify function
module.exports.handler = serverless(app);

