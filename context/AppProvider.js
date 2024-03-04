import React, {useReducer} from 'react';
import PropTypes from 'prop-types';
import {Provider} from './AppContext';
import reducer from './Reducer';

const initialState = {
  popularMovies: {
    popularLoading: true,
    popularError: null,
    popularData: {
      popularResults: [],
    },
  },
  topRatedMovies: {
    topRatedLoading: true,
    topRatedError: null,
    topRatedData: {
      topRatedResults: [],
    },
  },
  popularShows: {
    popularLoading: true,
    popularError: null,
    popularData: {
      popularResults: [],
    },
  },
  onAirShows: {
    onAirLoading: true,
    onAirError: null,
    onAirData: {
      onAirResults: [],
    },
  },
  guestSession: {
    guestSessionLoading: true,
    guestSessionError: null,
    guestSessionData: {},
  },
  movieDetails: {
    movieDetailsLoading: true,
    movieDetailsError: null,
    movieDetailsData: {},
  },
  tvShowsDetails: {
    tvShowsDetailsLoading: true,
    tvShowsDetailsError: null,
    tvShowsDetailsData: {},
  },
  movieRating: {
    movieRatingLoading: true,
    movieRatingError: null,
    movieRatingData: {},
  },
  tvShowRating: {
    tvShowRatingLoading: true,
    tvShowRatingError: null,
    tvShowRatingData: {},
  },
  guestRatedMovies: {
    guestRatedMoviesLoading: true,
    guestRatedMoviesError: null,
    guestRatedMoviesData: {
      guestRatedMoviesResults: [],
    },
  },
  guestRatedTvShows: {
    guestRatedTvShowsLoading: true,
    guestRatedTvShowsError: null,
    guestRatedTvShowsData: {
      guestRatedTvShowsResults: [],
    },
  },
  deleteMovieRating: {
    deleteMovieRatingLoading: true,
    deleteMovieRatingError: null,
    deleteMovieRatingData: {},
  },
  deleteTvShowRating: {
    deleteTvShowRatingLoading: true,
    deleteTvShowRatingError: null,
    deleteTvShowRatingData: {},
  },
};

const AppProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Provider
      value={{
        state,
        dispatch,
      }}>
      {props.children}
    </Provider>
  );
};
AppProvider.propTypes = {
  children: PropTypes.node,
};

export default AppProvider;
