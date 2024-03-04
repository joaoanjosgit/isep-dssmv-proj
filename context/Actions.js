import {makeHTTPRequest} from '../service/Service';

export const API_KEY = '?api_key=cbca6026fec0bc702466abffd479322e';
export const DEFAULT_URL = 'https://api.themoviedb.org/3';

export const FETCH_POPULAR_MOVIES_STARTED = 'FETCH_POPULAR_MOVIES_STARTED';
export const FETCH_POPULAR_MOVIES_SUCCESS = 'FETCH_POPULAR_MOVIES_SUCCESS';
export const FETCH_POPULAR_MOVIES_FAILURE = 'FETCH_POPULAR_MOVIES_FAILURE';

export const FETCH_TOP_RATED_MOVIES_STARTED = 'FETCH_TOP_RATED_MOVIES_STARTED';
export const FETCH_TOP_RATED_MOVIES_SUCCESS = 'FETCH_TOP_RATED_MOVIES_SUCCESS';
export const FETCH_TOP_RATED_MOVIES_FAILURE = 'FETCH_TOP_RATED_MOVIES_FAILURE';

export const FETCH_POPULAR_SHOWS_STARTED = 'FETCH_POPULAR_SHOWS_STARTED';
export const FETCH_POPULAR_SHOWS_SUCCESS = 'FETCH_POPULAR_SHOWS_SUCCESS';
export const FETCH_POPULAR_SHOWS_FAILURE = 'FETCH_POPULAR_SHOWS_FAILURE';

export const FETCH_ON_AIR_SHOWS_STARTED = 'FETCH_ON_AIR_SHOWS_STARTED';
export const FETCH_ON_AIR_SHOWS_SUCCESS = 'FETCH_ON_AIR_SHOWS_SUCCESS';
export const FETCH_ON_AIR_SHOWS_FAILURE = 'FETCH_ON_AIR_SHOWSS_FAILURE';

export const FETCH_GUEST_SESSION_STARTED = 'FETCH_GUEST_SESSION_STARTED';
export const FETCH_GUEST_SESSION_SUCCESS = 'FETCH_GUEST_SESSION_SUCCESS';
export const FETCH_GUEST_SESSION_FAILURE = 'FETCH_GUEST_SESSION_FAILURE';

export const FETCH_MOVIE_DETAILS_STARTED = 'FETCH_MOVIE_DETAILS_STARTED';
export const FETCH_MOVIE_DETAILS_SUCCESS = 'FETCH_MOVIE_DETAILS_SUCCESS';
export const FETCH_MOVIE_DETAILS_FAILURE = 'FETCH_MOVIE_DETAILS_FAILURE';

export const FETCH_TV_SHOWS_DETAILS_STARTED = 'FETCH_TV_SHOWS_DETAILS_STARTED';
export const FETCH_TV_SHOWS_DETAILS_SUCCESS = 'FETCH_TV_SHOWS_DETAILS_SUCCESS';
export const FETCH_TV_SHOWS_DETAILS_FAILURE = 'FETCH_TV_SHOWS_DETAILS_FAILURE';

export const FETCH_MOVIE_RATING_STARTED = 'FETCH_MOVIE_RATING_STARTED';
export const FETCH_MOVIE_RATING_SUCCESS = 'FETCH_MOVIE_RATING_SUCCESS';
export const FETCH_MOVIE_RATING_FAILURE = 'FETCH_MOVIE_RATING_FAILURE';

export const FETCH_TV_SHOW_RATING_STARTED = 'FETCH_TV_SHOW_RATING_STARTED';
export const FETCH_TV_SHOW_RATING_SUCCESS = 'FETCH_TV_SHOW_RATING_SUCCESS';
export const FETCH_TV_SHOW_RATING_FAILURE = 'FETCH_TV_SHOW_RATING_FAILURE';

export const FETCH_GUEST_RATED_MOVIES_STARTED =
  'FETCH_GUEST_RATED_MOVIES_STARTED';
export const FETCH_GUEST_RATED_MOVIES_SUCCESS =
  'FETCH_GUEST_RATED_MOVIES_SUCCESS';
export const FETCH_GUEST_RATED_MOVIES_FAILURE =
  'FETCH_GUEST_RATED_MOVIES_FAILURE';

export const FETCH_GUEST_RATED_TV_SHOWS_STARTED =
  'FETCH_GUEST_RATED_TV_SHOWS_STARTED';
export const FETCH_GUEST_RATED_TV_SHOWS_SUCCESS =
  'FETCH_GUEST_RATED_TV_SHOWS_SUCCESS';
export const FETCH_GUEST_RATED_TV_SHOWS_FAILURE =
  'FETCH_GUEST_RATED_TV_SHOWS_FAILURE';

export const DELETE_MOVIE_RATING_STARTED = 'DELETE_MOVIE_RATING_STARTED';
export const DELETE_MOVIE_RATING_SUCCESS = 'DELETE_MOVIE_RATING_SUCCESS';
export const DELETE_MOVIE_RATING_FAILURE = 'DELETE_MOVIE_RATING_FAILURE';

export const DELETE_TV_SHOW_RATING_STARTED = 'DELETE_TV_SHOW_RATING_STARTED';
export const DELETE_TV_SHOW_RATING_SUCCESS = 'DELETE_TV_SHOW_RATING_SUCCESS';
export const DELETE_TV_SHOW_RATING_FAILURE = 'DELETE_TV_SHOW_RATING_FAILURE';

export function fetchPopularMovies(url, request, dispatch) {
  //função ser executado em caso de sucesso
  const success = res => dispatch(fetchPopularMoviesSuccess(res));
  //função ser executado em caso de falha
  const failure = err => dispatch(fetchPopularMoviesFailure(err.message));
  makeHTTPRequest(url, request, success, failure);
}

export function fetchTopRatedMovies(url, request, dispatch) {
  //função ser executado em caso de sucesso
  const success = res => dispatch(fetchTopRatedMoviesSuccess(res));
  //função ser executado em caso de falha
  const failure = err => dispatch(fetchTopRatedMoviesFailure(err.message));
  makeHTTPRequest(url, request, success, failure);
}

export function fetchPopularShows(url, request, dispatch) {
  //função ser executado em caso de sucesso
  const success = res => dispatch(fetchPopularShowsSuccess(res));
  //função ser executado em caso de falha
  const failure = err => dispatch(fetchPopularShowsFailure(err.message));
  makeHTTPRequest(url, request, success, failure);
}

export function fetchOnAirShows(url, request, dispatch) {
  //função ser executado em caso de sucesso
  const success = res => dispatch(fetchOnAirShowsSuccess(res));
  //função ser executado em caso de falha
  const failure = err => dispatch(fetchOnAirShowsFailure(err.message));
  makeHTTPRequest(url, request, success, failure);
}

export function fetchGuestSession(url, request, dispatch) {
  //função ser executado em caso de sucesso
  const success = res => dispatch(fetchGuestSessionSuccess(res));
  //função ser executado em caso de falha
  const failure = err => dispatch(fetchGuestSessionFailure(err.message));
  makeHTTPRequest(url, request, success, failure);
}

export function fetchMovieDetails(url, request, dispatch) {
  //função ser executado em caso de sucesso
  const success = res => dispatch(fetchMovieDetailsSuccess(res));
  //função ser executado em caso de falha
  const failure = err => dispatch(fetchMovieDetailsFailure(err.message));
  makeHTTPRequest(url, request, success, failure);
}

export function fetchTvShowsDetails(url, request, dispatch) {
  //função ser executado em caso de sucesso
  const success = res => dispatch(fetchTvShowsDetailsSuccess(res));
  //função ser executado em caso de falha
  const failure = err => dispatch(fetchTvShowsDetailsFailure(err.message));
  makeHTTPRequest(url, request, success, failure);
}

export function fetchMovieRating(url, request, dispatch) {
  //função ser executado em caso de sucesso
  const success = res => dispatch(fetchMovieRatingSuccess(res));
  //função ser executado em caso de falha
  const failure = err => dispatch(fetchMovieRatingFailure(err.message));
  makeHTTPRequest(url, request, success, failure);
}

export function fetchTvShowRating(url, request, dispatch) {
  //função ser executado em caso de sucesso
  const success = res => dispatch(fetchTvShowRatingSuccess(res));
  //função ser executado em caso de falha
  const failure = err => dispatch(fetchTvShowRatingFailure(err.message));
  makeHTTPRequest(url, request, success, failure);
}

export function fetchGuestMovieRating(url, request, dispatch) {
  //função ser executado em caso de sucesso
  const success = res => dispatch(fetchGuestMovieRatingSuccess(res));
  //função ser executado em caso de falha
  const failure = err => dispatch(fetchGuestMovieRatingFailure(err.message));
  makeHTTPRequest(url, request, success, failure);
}

export function fetchGuestTvShowsRating(url, request, dispatch) {
  //função ser executado em caso de sucesso
  const success = res => dispatch(fetchGuestTvShowsRatingSuccess(res));
  //função ser executado em caso de falha
  const failure = err => dispatch(fetchGuestTvShowsRatingFailure(err.message));
  makeHTTPRequest(url, request, success, failure);
}

export function deleteMovieRatingApi(url, request, dispatch) {
  //função ser executado em caso de sucesso
  const success = res => dispatch(deleteMovieRatingSuccess(res));
  //função ser executado em caso de falha
  const failure = err => dispatch(deleteMovieRatingFailure(err.message));
  makeHTTPRequest(url, request, success, failure);
}
export function deleteTvShowRatingApi(url, request, dispatch) {
  //função ser executado em caso de sucesso
  const success = res => dispatch(deleteTvShowRatingSuccess(res));
  //função ser executado em caso de falha
  const failure = err => dispatch(deleteTvShowRatingFailure(err.message));
  makeHTTPRequest(url, request, success, failure);
}

export function fetchPopularMoviesStarted() {
  return {
    type: FETCH_POPULAR_MOVIES_STARTED,
  };
}

export function fetchPopularMoviesSuccess(movies) {
  return {
    type: FETCH_POPULAR_MOVIES_SUCCESS,
    data: {
      results: [...movies.results],
    },
  };
}
export function fetchPopularMoviesFailure(message) {
  return {
    type: FETCH_POPULAR_MOVIES_FAILURE,
    error: message,
    data: {},
  };
}

export function fetchTopRatedMoviesStarted() {
  return {
    type: FETCH_TOP_RATED_MOVIES_STARTED,
  };
}

export function fetchTopRatedMoviesSuccess(movies) {
  return {
    type: FETCH_TOP_RATED_MOVIES_SUCCESS,
    data: {
      results: [...movies.results],
    },
  };
}

export function fetchTopRatedMoviesFailure(message) {
  return {
    type: FETCH_TOP_RATED_MOVIES_FAILURE,
    error: message,
    data: {},
  };
}

export function fetchPopularShowsStarted() {
  return {
    type: FETCH_POPULAR_SHOWS_STARTED,
  };
}

export function fetchPopularShowsSuccess(shows) {
  return {
    type: FETCH_POPULAR_SHOWS_SUCCESS,
    data: {
      results: [...shows.results],
    },
  };
}
export function fetchPopularShowsFailure(message) {
  return {
    type: FETCH_POPULAR_SHOWS_FAILURE,
    error: message,
    data: {},
  };
}

export function fetchOnAirShowsStarted() {
  return {
    type: FETCH_ON_AIR_SHOWS_STARTED,
  };
}

export function fetchOnAirShowsSuccess(shows) {
  return {
    type: FETCH_ON_AIR_SHOWS_SUCCESS,
    data: {
      results: [...shows.results],
    },
  };
}

export function fetchOnAirShowsFailure(message) {
  return {
    type: FETCH_ON_AIR_SHOWS_FAILURE,
    error: message,
    data: {},
  };
}
export function fetchGuestSessionStarted() {
  return {
    type: FETCH_GUEST_SESSION_STARTED,
  };
}

export function fetchGuestSessionSuccess(data) {
  return {
    type: FETCH_GUEST_SESSION_SUCCESS,
    data: {...data},
  };
}

export function fetchGuestSessionFailure(message) {
  return {
    type: FETCH_GUEST_SESSION_FAILURE,
    error: message,
    data: {},
  };
}
export function fetchMovieDetailsStarted(id) {
  return {
    type: FETCH_MOVIE_DETAILS_STARTED,
    id: id,
  };
}

export function fetchMovieDetailsSuccess(data) {
  return {
    type: FETCH_MOVIE_DETAILS_SUCCESS,
    data: {...data},
  };
}

export function fetchMovieDetailsFailure(message) {
  return {
    type: FETCH_MOVIE_DETAILS_FAILURE,
    error: message,
    data: {},
  };
}
export function fetchTvShowsDetailsStarted(id) {
  return {
    type: FETCH_TV_SHOWS_DETAILS_STARTED,
    id: id,
  };
}

export function fetchTvShowsDetailsSuccess(data) {
  return {
    type: FETCH_TV_SHOWS_DETAILS_SUCCESS,
    data: {...data},
  };
}

export function fetchTvShowsDetailsFailure(message) {
  return {
    type: FETCH_TV_SHOWS_DETAILS_FAILURE,
    error: message,
    data: {},
  };
}
export function fetchTvShowRatingStarted(id) {
  return {
    type: FETCH_TV_SHOW_RATING_STARTED,
    id: id,
  };
}

export function fetchTvShowRatingSuccess(data) {
  return {
    type: FETCH_TV_SHOW_RATING_SUCCESS,
    data: {...data},
  };
}

export function fetchTvShowRatingFailure(message) {
  return {
    type: FETCH_TV_SHOW_RATING_FAILURE,
    error: message,
    data: {},
  };
}
export function fetchMovieRatingStarted(id) {
  return {
    type: FETCH_MOVIE_RATING_SUCCESS,
    id: id,
  };
}

export function fetchMovieRatingSuccess(data) {
  return {
    type: FETCH_MOVIE_RATING_SUCCESS,
    data: {...data},
  };
}

export function fetchMovieRatingFailure(message) {
  return {
    type: FETCH_MOVIE_RATING_FAILURE,
    error: message,
    data: {},
  };
}
export function fetchGuestMovieRatingStarted(id) {
  return {
    type: FETCH_GUEST_RATED_MOVIES_STARTED,
    id: id,
  };
}

export function fetchGuestMovieRatingSuccess(movies) {
  return {
    type: FETCH_GUEST_RATED_MOVIES_SUCCESS,
    data: {
      results: [...movies.results],
    },
  };
}

export function fetchGuestMovieRatingFailure(message) {
  return {
    type: FETCH_GUEST_RATED_MOVIES_FAILURE,
    error: message,
    data: {},
  };
}
export function fetchGuestTvShowsRatingStarted(id) {
  return {
    type: FETCH_GUEST_RATED_TV_SHOWS_STARTED,
    id: id,
  };
}

export function fetchGuestTvShowsRatingSuccess(shows) {
  return {
    type: FETCH_GUEST_RATED_TV_SHOWS_SUCCESS,
    data: {
      results: [...shows.results],
    },
  };
}

export function fetchGuestTvShowsRatingFailure(message) {
  return {
    type: FETCH_GUEST_RATED_TV_SHOWS_FAILURE,
    error: message,
    data: {},
  };
}

export function deleteMovieRatingStarted(id) {
  return {
    type: DELETE_MOVIE_RATING_STARTED,
    id: id,
  };
}

export function deleteMovieRatingSuccess(data) {
  return {
    type: DELETE_MOVIE_RATING_SUCCESS,
    success: {},
    data: {...data},
  };
}

export function deleteMovieRatingFailure(message) {
  return {
    type: DELETE_MOVIE_RATING_FAILURE,
    error: message,
    data: {},
  };
}
export function deleteTvShowRatingStarted(id) {
  return {
    type: DELETE_TV_SHOW_RATING_STARTED,
    id: id,
  };
}

export function deleteTvShowRatingSuccess(data) {
  return {
    type: DELETE_TV_SHOW_RATING_SUCCESS,
    success: {},
    data: {...data},
  };
}

export function deleteTvShowRatingFailure(message) {
  return {
    type: DELETE_TV_SHOW_RATING_FAILURE,
    error: message,
    data: {},
  };
}
