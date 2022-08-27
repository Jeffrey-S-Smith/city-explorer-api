const axios = require('axios');
// app.get('/weather'
let getWeather = async (request, response, next) => {

  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_KEY}&units=I&lat=${lat}&lon=${lon}&days=5&unitsI`;

    let apiResponse = await axios.get(url);
 
    let weatherData = apiResponse.data;
   
    let  selectWeatherObj = weatherData.data.map(day => new Forecast(day));
    response.send(selectWeatherObj);
   
  } catch (err) {
    next(err);
  }
};

class Forecast {
  constructor(day) {
    this.description = day.weather.description;
    this.date = day.datetime;
    this.max_temp = day.max_temp;
    this.low_temp = day.low_temp;

  }
}

module.exports = getWeather;
