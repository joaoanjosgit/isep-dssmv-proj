import {
  FETCH_POPULAR_MOVIES_STARTED,
  FETCH_POPULAR_MOVIES_SUCCESS,
  FETCH_POPULAR_MOVIES_FAILURE,
  FETCH_TOP_RATED_MOVIES_STARTED,
  FETCH_TOP_RATED_MOVIES_SUCCESS,
  FETCH_TOP_RATED_MOVIES_FAILURE,
  FETCH_ON_AIR_SHOWS_SUCCESS,
  FETCH_ON_AIR_SHOWS_FAILURE,
  FETCH_ON_AIR_SHOWS_STARTED,
  FETCH_POPULAR_SHOWS_FAILURE,
  FETCH_POPULAR_SHOWS_STARTED,
  FETCH_POPULAR_SHOWS_SUCCESS,
  FETCH_GUEST_SESSION_STARTED,
  FETCH_GUEST_SESSION_SUCCESS,
  FETCH_GUEST_SESSION_FAILURE,
  FETCH_MOVIE_DETAILS_STARTED,
  FETCH_MOVIE_DETAILS_SUCCESS,
  FETCH_MOVIE_DETAILS_FAILURE,
  FETCH_TV_SHOWS_DETAILS_STARTED,
  FETCH_TV_SHOWS_DETAILS_SUCCESS,
  FETCH_TV_SHOWS_DETAILS_FAILURE,
  FETCH_MOVIE_RATING_SUCCESS,
  FETCH_MOVIE_RATING_STARTED,
  FETCH_MOVIE_RATING_FAILURE,
  FETCH_TV_SHOW_RATING_STARTED,
  FETCH_TV_SHOW_RATING_SUCCESS,
  FETCH_TV_SHOW_RATING_FAILURE,
  FETCH_GUEST_RATED_MOVIES_STARTED,
  FETCH_GUEST_RATED_MOVIES_SUCCESS,
  FETCH_GUEST_RATED_MOVIES_FAILURE,
  FETCH_GUEST_RATED_TV_SHOWS_STARTED,
  FETCH_GUEST_RATED_TV_SHOWS_SUCCESS,
  FETCH_GUEST_RATED_TV_SHOWS_FAILURE,
  DELETE_MOVIE_RATING_STARTED,
  DELETE_MOVIE_RATING_SUCCESS,
  DELETE_MOVIE_RATING_FAILURE,
  DELETE_TV_SHOW_RATING_STARTED,
  DELETE_TV_SHOW_RATING_SUCCESS,
  DELETE_TV_SHOW_RATING_FAILURE,
} from './Actions';

function reducer(state, action) {
  switch (action.type) {
    case FETCH_POPULAR_MOVIES_STARTED:
      return {
        ...state,
        popularMovies: {
          popularLoading: true,
          popularError: null,
          popularData: {
            popularResults: [],
          },
        },
      };
    case FETCH_POPULAR_MOVIES_SUCCESS:
      return {
        ...state,
        popularMovies: {
          popularLoading: false,
          popularError: null,
          popularData: {
            popularResults: [...action.data.results],
          },
        },
      };
    case FETCH_POPULAR_MOVIES_FAILURE:
      return {
        ...state,
        popularMovies: {
          popularLoading: false,
          popularError: action.error,
          popularData: {
            popularResults: [],
          },
        },
      };
    case FETCH_TOP_RATED_MOVIES_STARTED:
      return {
        ...state,
        topRatedMovies: {
          topRatedLoading: true,
          topRatedError: null,
          topRatedData: {
            topRatedResults: [],
          },
        },
      };
    case FETCH_TOP_RATED_MOVIES_SUCCESS:
      return {
        ...state,
        topRatedMovies: {
          topRatedLoading: false,
          topRatedError: null,
          topRatedData: {
            topRatedResults: [...action.data.results],
          },
        },
      };
    case FETCH_TOP_RATED_MOVIES_FAILURE:
      return {
        ...state,
        topRatedMovies: {
          topRatedLoading: false,
          topRatedError: action.error,
          topRatedData: {
            topRatedResults: [],
          },
        },
      };
    case FETCH_POPULAR_SHOWS_STARTED:
      return {
        ...state,
        popularShows: {
          popularLoading: true,
          popularError: null,
          popularData: {
            popularResults: [],
          },
        },
      };
    case FETCH_POPULAR_SHOWS_SUCCESS:
      return {
        ...state,
        popularShows: {
          popularLoading: false,
          popularError: null,
          popularData: {
            popularResults: [...action.data.results],
          },
        },
      };
    case FETCH_POPULAR_SHOWS_FAILURE:
      return {
        ...state,
        popularShows: {
          popularLoading: false,
          popularError: action.error,
          popularData: {
            popularResults: [],
          },
        },
      };
    case FETCH_ON_AIR_SHOWS_STARTED:
      return {
        ...state,
        onAirShows: {
          onAirLoading: true,
          onAirError: null,
          onAirData: {
            onAirResults: [],
          },
        },
      };
    case FETCH_ON_AIR_SHOWS_SUCCESS:
      return {
        ...state,
        onAirShows: {
          onAirLoading: false,
          onAirError: null,
          onAirData: {
            onAirResults: [...action.data.results],
          },
        },
      };
    case FETCH_ON_AIR_SHOWS_FAILURE:
      return {
        ...state,
        onAirShows: {
          onAirLoading: false,
          onAirError: action.error,
          onAirData: {
            onAirResults: [],
          },
        },
      };
    case FETCH_GUEST_SESSION_STARTED:
      return {
        ...state,
        guestSession: {
          guestSessionLoading: true,
          guestSessionError: null,
          guestSessionData: {},
        },
      };
    case FETCH_GUEST_SESSION_SUCCESS:
      return {
        ...state,
        guestSession: {
          guestSessionLoading: false,
          guestSessionError: null,
          guestSessionData: {...action.data},
        },
      };
    case FETCH_GUEST_SESSION_FAILURE:
      return {
        ...state,
        guestSession: {
          guestSessionLoading: false,
          guestSessionError: action.error,
          guestSessionData: {},
        },
      };
    case FETCH_MOVIE_DETAILS_STARTED:
      return {
        ...state,
        movieDetails: {
          movieDetailsLoading: true,
          movieDetailsError: null,
          movieDetailsData: {},
        },
      };
    case FETCH_MOVIE_DETAILS_SUCCESS:
      return {
        ...state,
        movieDetails: {
          movieDetailsLoading: false,
          movieDetailsError: null,
          movieDetailsData: {...action.data},
        },
      };
    case FETCH_MOVIE_DETAILS_FAILURE:
      return {
        ...state,
        movieDetails: {
          movieDetailsLoading: false,
          movieDetailsError: action.error,
          movieDetailsData: {},
        },
      };
    case FETCH_TV_SHOWS_DETAILS_STARTED:
      return {
        ...state,
        tvShowsDetails: {
          tvShowsDetailsLoading: true,
          tvShowsDetailsError: null,
          tvShowsDetailsData: {},
        },
      };
    case FETCH_TV_SHOWS_DETAILS_SUCCESS:
      return {
        ...state,
        tvShowsDetails: {
          tvShowsDetailsLoading: false,
          tvShowsDetailsError: null,
          tvShowsDetailsData: {...action.data},
        },
      };
    case FETCH_TV_SHOWS_DETAILS_FAILURE:
      return {
        ...state,
        tvShowsDetails: {
          tvShowsDetailsLoading: false,
          tvShowsDetailsError: action.error,
          tvShowsDetailsData: {},
        },
      };
    case FETCH_MOVIE_RATING_STARTED:
      return {
        ...state,
        movieRating: {
          movieRatingLoading: true,
          movieRatingError: null,
          movieRatingData: {},
        },
      };
    case FETCH_MOVIE_RATING_SUCCESS:
      return {
        ...state,
        movieRating: {
          movieRatingLoading: false,
          movieRatingError: null,
          movieRatingData: {...action.data},
        },
      };
    case FETCH_MOVIE_RATING_FAILURE:
      return {
        ...state,
        movieRating: {
          movieRatingLoading: false,
          movieRatingError: action.error,
          movieRatingData: {},
        },
      };
    case FETCH_TV_SHOW_RATING_STARTED:
      return {
        ...state,
        tvShowRating: {
          tvShowRatingLoading: true,
          tvShowRatingError: null,
          tvShowRatingData: {},
        },
      };
    case FETCH_TV_SHOW_RATING_SUCCESS:
      return {
        ...state,
        tvShowRating: {
          tvShowRatingLoading: false,
          tvShowRatingError: null,
          tvShowRatingData: {...action.data},
        },
      };
    case FETCH_TV_SHOW_RATING_FAILURE:
      return {
        ...state,
        tvShowRating: {
          tvShowRatingLoading: false,
          tvShowRatingError: action.error,
          tvShowRatingData: {},
        },
      };
    case FETCH_GUEST_RATED_MOVIES_STARTED:
      return {
        ...state,
        guestRatedMovies: {
          guestRatedMoviesLoading: true,
          guestRatedMoviesError: null,
          guestRatedMoviesData: {
            guestRatedMoviesResults: [],
          },
        },
      };
    case FETCH_GUEST_RATED_MOVIES_SUCCESS:
      return {
        ...state,
        guestRatedMovies: {
          guestRatedMoviesLoading: false,
          guestRatedMoviesError: null,
          guestRatedMoviesData: {
            guestRatedMoviesResults: [...action.data.results],
          },
        },
      };
    case FETCH_GUEST_RATED_MOVIES_FAILURE:
      return {
        ...state,
        guestRatedMovies: {
          guestRatedMoviesLoading: false,
          guestRatedMoviesError: action.error,
          guestRatedMoviesData: {
            guestRatedMoviesResults: [],
          },
        },
      };
    case FETCH_GUEST_RATED_TV_SHOWS_STARTED:
      return {
        ...state,
        guestRatedTvShows: {
          guestRatedTvShowsLoading: true,
          guestRatedTvShowsError: null,
          guestRatedTvShowsData: {
            guestRatedTvShowsResults: [],
          },
        },
      };
    case FETCH_GUEST_RATED_TV_SHOWS_SUCCESS:
      return {
        ...state,
        guestRatedTvShows: {
          guestRatedTvShowsLoading: false,
          guestRatedTvShowsError: null,
          guestRatedTvShowsData: {
            guestRatedTvShowsResults: [...action.data.results],
          },
        },
      };
    case FETCH_GUEST_RATED_TV_SHOWS_FAILURE:
      return {
        ...state,
        guestRatedTvShows: {
          guestRatedTvShowsLoading: false,
          guestRatedTvShowsError: action.error,
          guestRatedTvShowsData: {
            guestRatedTvShowsResults: [],
          },
        },
      };
    case DELETE_MOVIE_RATING_STARTED:
      return {
        ...state,
        deleteMovieRating: {
          deleteMovieRatingLoading: true,
          deleteMovieRatingError: null,
          deleteMovieRatingData: {},
        },
      };
    case DELETE_MOVIE_RATING_SUCCESS:
      return {
        ...state,
        deleteMovieRating: {
          deleteMovieRatingSuccess: true,
          deleteMovieRatingLoading: false,
          deleteMovieRatingError: null,
          deleteMovieRatingData: {...action.data},
        },
      };
    case DELETE_MOVIE_RATING_FAILURE:
      return {
        ...state,
        deleteMovieRating: {
          deleteMovieRatingLoading: false,
          deleteMovieRatingError: action.error,
          deleteMovieRatingData: {},
        },
      };
    case DELETE_TV_SHOW_RATING_STARTED:
      return {
        ...state,
        deleteTvShowRating: {
          deleteTvShowRatingLoading: true,
          deleteTvShowRatingError: null,
          deleteTvShowRatingData: {},
        },
      };
    case DELETE_TV_SHOW_RATING_SUCCESS:
      return {
        ...state,
        deleteTvShowRating: {
          deleteTvShowRatingSuccess: true,
          deleteTvShowRatingLoading: false,
          deleteTvShowRatingError: null,
          deleteTvShowRatingData: {...action.data},
        },
      };
    case DELETE_TV_SHOW_RATING_FAILURE:
      return {
        ...state,
        deleteTvShowRating: {
          deleteTvShowRatingLoading: false,
          deleteTvShowRatingError: action.error,
          deleteTvShowRatingData: {},
        },
      };
    default:
      return state;
  }
}

export default reducer;
