const express = require('express');
const cors = require('cors');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const app = express();

const customers = require('./customers.js');
const config = require('./config.json');

const API_AUDIENCE = config.API_AUDIENCE;
const AUTH0_DOMAIN = config.AUTH0_DOMAIN;
const PORT = process.env.PORT || config.PORT;

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${AUTH0_DOMAIN}.well-known/jwks.json`
  }),
  audience: API_AUDIENCE,
  issuer: AUTH0_DOMAIN,
  algorithms: ['RS256']
})

app.use(cors());

app.get('/', checkJwt, (req, res) => {
  console.log(`User: ${req.user}`);
  res.send('Hello <b>world!</b>');
});

app.get('/customers', checkJwt, (req, res) => {
  let response = [];
  console.log(`Query parameters: ${req.query}`);

  if (typeof req.query.status != 'undefined') {
    customers.filter(function (customer) {
      if (customer.status === req.query.status) {
        response.push(customer);
      }
    });
  }

  if (Object.keys(req.query).length === 0) {
    response = customers;
  }

  res.json(response);
});

app.listen(PORT, () => console.log(`API listening on port ${PORT}!`));
