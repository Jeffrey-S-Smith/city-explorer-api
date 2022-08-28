`use strict';

// Require
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const weatherHandler = require('./modules/weather.js');
const getMovies = require('./modules/movies.js');


// Use
const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.status(200).send('my awesome server');
});

app.get('/weather', weatherHandler);
app.get('/movie', weatherHandler);

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(200).send('Sorry. Something went wrong!')
  });
}  

app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));