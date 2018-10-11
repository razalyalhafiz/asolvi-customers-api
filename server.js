// Get dependencies
var express = require('express');
var app = express();
var jwt = require('express-jwt');
var rsaValidation = require('auth0-api-jwt-rsa-validation');

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
})

// Launch our API Server and have it listen on port 8080.
app.listen(process.env.PORT || 8080);