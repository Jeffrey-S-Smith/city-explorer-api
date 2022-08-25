'use strict';
const axios = require('axios');
//Require
// REQUIRE
// in our servers, we have to use 'require' instead of import. Here we will list the requirements for a server

// to create a server we are bringing in express
const express = require('express');

// we need to bring in our .env file, so we'll use this after we run 'npm i dotenv':
require('dotenv').config();

// we must include cors if we want to share resources over the web.
const cors = require('cors');



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

app.get('/weather', async (request, response, next) => {

  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_KEY}&units=I&lat=${lat}&lon=${lon}`;

    let apiResponse = await axios.get(url);

    
    let weatherData = apiResponse.data;
   
    let  selectWeatherObj = weatherData.data.map(day => new Forecast(day));
    
    response.send(selectWeatherObj);

   
  } catch (err) {
    next(err);
  }
});



// catch all "star" route
app.get('*', (request, response) => {
  response.send('Internal Server Error.');
});

// ERRORS
// handle any errors


// Not Found

// error handling middleware must be the last app.use()
app.use((error, request, response, next) => {
  console.error(error);
  response.status(500).send(error.message);
});

//class
class Forecast {
  constructor(day) {
    this.description = day.weather.description;
    this.date = day.datetime;
    this.max_temp = day.max_temp;
    this.low_temp = day.low_temp;

  }
}
// LISTEN
// Start the server
// Listen is express method. It takes in a Port value and callback function
app.listen(PORT, () => console.log(`listening on ${PORT}`));

/*
lab 08 back end
create GitHub
image-finder-back-end like 201

server.js
.env .env.sample
npm init -y
npm cors axios dotenv express

//require
require('dotenv").config();
const express =require('express');
const cors =require('cors');
const axios =require('axios');

//use
const app =express();
app.use(cor())

const PORT = process.env.PORT || 3002;
app.get('?', (req,res) => {
  res.status.
})

app.use((err,req, res, next)=>{
  console.log(err.message);
  res.(500).send(err.message);
})
.env PORT=3001

lab9

module.export=getPhotos;

Promise.resolve().then(() =>{
  throw new Error(err.message);
}).catch(next);
*/
