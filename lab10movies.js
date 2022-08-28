const axios = require('axios');
const cache = require('./cache.js');


let getMovie = async (request, response, next) => {
  

  try {
    let city = request.query.city;
    
    // let key = city + 'Data';

    // let timeToCache = 1000 * 60 * 60 * 24 * 30;
    // let cacheTest = 1000 * 20;

    // if (cache[key] && Date.now() - cache[key].timestamp < timeToCache) {

    //   console.log('It\'s in the cache!');
    //   response.status(200).send(cache[key].data);
    // } else {
   
    let url = `http://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_KEY}&query=${city}&include_adult=false`;
   
    let apiResponse = await axios.get(url);
    console.log(apiResponse);
    let movieData = apiResponse.data;
    console.log(movieData);
    let  selectMovieObj = movieData.results.map(movie => new Movie(movie));
    response.send(selectMovieObj);

  //   cache[key] = {
  //     data: selectMovieObj,
  //     timestamp: Date.now(),
  //   }

  // };
  } catch (err) {
    next(err);
  }
};

class Movie {
  constructor(movie) {
    this.title = movie.original_title;
    this.overview = movie.overview;
    this.imgPath = movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : '';
    this.id = movie.id;
    this.average_votes = movie.vote_average;
    this.total_votes = movie.vote_count;
    this.popularity = movie.popularity;
    this.released = movie.release_date;
  }
}

module.exports = getMovie;