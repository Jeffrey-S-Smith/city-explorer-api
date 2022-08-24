'use strict';

//Require
// REQUIRE
// in our servers, we have to use 'require' instead of import. Here we will list the requirements for a server

// to create a server we are bringing in express
const express = require('express');

// we need to bring in our .env file, so we'll use this after we run 'npm i dotenv':
require('dotenv').config();

// we must include cors if we want to share resources over the web.
const cors = require('cors');

// bring in JSON data
let data = require('./data/weather.json');

// USE
// Once we have required something, we have to use it. This were will will assign the required file a variable. React does this in one step, express takes 2: require and use. This is just Express is.

// once we have express we are must USE express
const app = express();

app.use(cors());

// define PORT value - validate that .env is working

const PORT = process.env.PORT || 3002;

// if the server is running on 3002, then I know something is wrong in either my .env or how I'm importing the values from it

// ROUTES
// We will use these to access our endpoints

// create a basic default route:
// app.get correlates to axios.get
// the first parameter is a URL in quotes

app.get('/', (request, response) => {
  response.send('Hello from our server!');
});


app.get('/weather', (request, response) => {
  let lat = request.query.lat;
  let lon = request.query.lon;
  let cityQuery = request.query.searchQuery;
  let weatherObj = data.find(weather => cityQuery === weather.city_name);
  let selectWeatherObj = new Forecast(weatherObj);
  response.send(selectWeatherObj);
  // response.send(`weather`);

});



// catch all "star" route
app.get('*', (request, response) => {
  response.send('Route does not exists. These are not the droids you\'re looking for.');
});

// ERRORS
// handle any errors


// Not Found

// error handling middleware must be the last app.use()
app.use((error, request, response, next) => {
  console.error(error);
  response.status(400).send(error.message);
});

app.use((error, request, response, next) => {
  console.error(error);
  response.status(404).send(error.message);
});

app.use((error, request, response, next) => {
  console.error(error);
  response.status(500).send(error.message);
});

//class
class Forecast {
  constructor(weatherObj) {
    this.date = weatherObj.date;
    this.description = weatherObj.description;

  }
}
// LISTEN
// Start the server
// Listen is express method. It takes in a Port value and callback function
app.listen(PORT, () => console.log(`listening on ${PORT}`));

