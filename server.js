// Get dependencies
var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require("jwks-rsa");
var port = process.env.PORT || 8080;

// Below is a middleware function to validate the access token when our API is called
// Note that the audience field is the identifier given to the Auth0 API
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://razalyalhafiz.au.auth0.com/.well-known/jwks.json"
  }),
  audience: "https://asolvi-customers-api.herokuapp.com",
  issuer: "https://razalyalhafiz.au.auth0.com/",
  algorithms: ["RS256"]
});

// Below is a middleware function to ensure the client has permissions to the API endpoint
var guard = function (req, res, next) {
    switch (req.path) {
        case '/customers': {
            var permissions = ['general'];
            for (var i = 0; i < permissions.length; i++) {
                if (req.user.scope.includes(permissions[i])) {
                    next();
                } else {
                    res.send(403, { message: 'Forbidden' });
                }
            }
            break;
        }
    }
};

// Enable the use of the jwtCheck & guard middleware in all of the routes
app.use(jwtCheck);
app.use(guard);

// If incorrect credentials are submitted, an appropriate error message will be returned
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ message: 'Missing or invalid token' });
    }
});

// Implement the customers API endpoint
app.get('/customers', function(req, res){
  // Get a list of customers
  var customers = [
    {firstname: 'Janne', lastname: 'Longo', status: 'hot', id: 1},
    {firstname: 'Luis', lastname: 'Molina', status: 'hot', id: 2},
    {firstname: 'Razaly', lastname: 'Alhafiz', status: 'cool', id: 3}
  ]

// Send the response as a JSON array
res.json(customers);
});

// Launch our API Server and have it listen on port 8080
app.listen(port);