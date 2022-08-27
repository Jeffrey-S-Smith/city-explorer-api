const axios = require('axios');

// app.get('/movie',
let getMovie = async (request, response, next) => {

  try {
    let city = request.query.city;
    // let url = `https://api.themoviedb.org/3/search/company?api_key=a6294b05cd97c6e1c59e454b44e3a03f&query=seattle`;
   
    let url = `http://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_KEY}&query=${city}&include_adult=false`;
   
    let apiResponse = await axios.get(url);
    console.log(apiResponse);
    let movieData = apiResponse.data;
    console.log(movieData);
    let  selectMovieObj = movieData.results.map(movie => new Movie(movie));
    response.send(selectMovieObj);
   
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