# asolvi-customers-api
Web service that provides an API to view the list of Asolvi dummy customers.

A working example of the API can be found at https://asolvi-customers-api.herokuapp.com/customers.

To get the list of <b>Hot</b> customers, please use the following URL:
https://asolvi-customers-api.herokuapp.com/customers?status=Hot

<b>Note:</b> Since the API is secured with <b>Auth0</b>, an access token must be included in the request 
header when making an API call.

For own usage, please ensure the entries in the <i>config.json</i> file is modified according to your <b>Auth0</b> account.
The web service can be started using the command <i>npm start</i> or <i>node server.js</i>.
