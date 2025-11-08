const express = require('express');
const https = require('https');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 4242;

app.use(express.static('public'));
app.use(express.json());

const whitelist = ['http://localhost:5500', 'http://localhost:4242','http://127.0.0.1:5500','http://127.0.0.1:5501'];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));

/*
    TEST: https://testapi-pw.izipay.pe/security/v1/Token/Generate
    PROD: https://api-pw.izipay.pe/security/v1/Token/Generate
*/

app.post('/token', async (req, res) => {

    const { body, headers: { transactionid } } = req;

    const options = {
        host: 'testapi-pw.izipay.pe',
        port: 443,
        path: '/security/v1/Token/Generate',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'transactionId': transactionid,
        },
        body: body,
    };

    const request = https.request(options, callback => {
        callback.on('data', data => {
            res.send(JSON.parse(data));
        });
    });

    request.on('error', error => {
        console.error(error);
    });

    if (req.body) request.write(JSON.stringify(req.body));
    request.end();

});

app.listen(port, () => console.log('Node server listening on port: ', port));
