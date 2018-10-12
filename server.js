const express = require('express');
const cors = require('cors');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const app = express();

const config = require('./config.json');
const apiIdentifier = config.apiIdentifier;
const auth0Domain = config.auth0Domain;
const PORT = process.env.PORT || config.PORT;

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${auth0Domain}/.well-known/jwks.json`
  }),
  audience: apiIdentifier,
  issuer: auth0Domain,
  algorithms: ["RS256"]
})

app.use(cors());

app.get('/', checkJwt, (req, res) => {
  console.log(req.user);
  res.send({ hello: 'world' });
});

app.listen(PORT, () => console.log(`API listening on port ${PORT}!`));
