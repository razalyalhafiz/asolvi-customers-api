const express = require('express');
const cors = require('cors');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const app = express();
const port = process.env.PORT || 8080;

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://razalyalhafiz.au.auth0.com/.well-known/jwks.json"
  }),
  audience: "https://asolvi-customers-api.herokuapp.com",
  issuer: "https://razalyalhafiz.au.auth0.com/",
  algorithms: ["RS256"]
});

app.use(cors());

app.get('/', checkJwt, (req, res) => {
  console.log(req.user);
  res.send({ hello: 'world' })
});

app.listen(port, () => console.log('Example app listening on port ${port}!'));
