const express = require('express');
const cors = require('cors');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const app = express();

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
  algorithms: ["RS256"]
})

app.use(cors());

app.get('/', checkJwt, (req, res) => {
  console.log(req.user);
  
  var customers = [
    { id: 0, name: 'Robert Smith', status: 'Hot', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/angelcolberg/128.jpg' },
    { id: 1, name: 'Chris Harris', status: 'Cool', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/bungiwan/128.jpg' },
    { id: 2, name: 'Janet Garcia', status: 'Hot', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/grrr_nl/128.jpg' },
    { id: 3, name: 'Mindy Lee', status: 'Cool', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/laurengray/128.jpg' }
  ];
  
  res.json(customers);
  // res.send('hello <b>world!</b>');
});

app.listen(PORT, () => console.log(`API listening on port ${PORT}!`));
