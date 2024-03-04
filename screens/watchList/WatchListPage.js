import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppContext from '../../context/AppContext';
import {
  API_KEY,
  DEFAULT_URL,
  fetchGuestMovieRating,
  fetchGuestMovieRatingStarted,
  fetchGuestTvShowsRating,
  fetchGuestTvShowsRatingStarted,
} from '../../context/Actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MovieLoading from '../../components/MovieLoading';
import MovieHeader from '../../components/MovieHeader';
import MoviesWatchList from '../../components/MoviesWatchList';
import TvShowsWatchList from '../../components/TvShowsWatchList';
import MoviesFavoritesList from '../../components/MoviesFavoritesList';
import EncryptedStorage from 'react-native/Libraries/Storage/AsyncStorage';
import {func} from 'prop-types';
import {tildeTrimReplace} from '@babel/core/lib/vendor/import-meta-resolve';
import TvShowsFavoritesList from '../../components/TvShowsFavoritesList';

async function _retrieveData() {
  try {
    const value = await AsyncStorage.getItem('guest');
    if (value !== null) {
      // We have data!!
      return value;
    }
  } catch (error) {
    // Error retrieving data
  }
}

async function retrieveUserSession() {
  const jsonValue = await EncryptedStorage.getItem('WatchList');
  if (jsonValue !== undefined) {
    const movie = JSON.parse(jsonValue);
    console.log(movie);
    return movie;
  }
}

async function retrieveTvShowWatchList() {
  const jsonValue = await EncryptedStorage.getItem('TvShowsWatchList');
  if (jsonValue !== undefined) {
    const tvShow = JSON.parse(jsonValue);
    console.log(tvShow);
    return tvShow;
  }
}

function getData(setList) {
  retrieveUserSession().then(r => {
    setList(r);
  });
}

function getTvShowData(setTvShowList) {
  retrieveTvShowWatchList().then(r => {
    setTvShowList(r);
  });
}

function fetchMovies(dispatch, flag) {
  dispatch(fetchGuestMovieRatingStarted(flag));

  const url =
    DEFAULT_URL + '/guest_session/' + flag + '/rated/movies' + API_KEY;
  const request = {method: 'get'};
  fetchGuestMovieRating(url, request, dispatch);
}

function fetchShows(dispatch, flag) {
  dispatch(fetchGuestTvShowsRatingStarted(flag));

  const url = DEFAULT_URL + '/guest_session/' + flag + '/rated/tv' + API_KEY;
  const request = {method: 'get'};
  fetchGuestTvShowsRating(url, request, dispatch);
}

function WatchListPage(props) {
  const {state, dispatch} = useContext(AppContext);
  const {guestRatedMovies} = state;
  const {guestRatedTvShows} = state;
  const {guestRatedMoviesLoading, guestRatedMoviesError, guestRatedMoviesData} =
    guestRatedMovies;
  const {
    guestRatedTvShowsLoading,
    guestRatedTvShowsError,
    guestRatedTvShowsData,
  } = guestRatedTvShows;
  const [flag, setFlag] = useState();
  const [movieList, setMovieList] = useState();
  const [tvShowList, setTvShowList] = useState();
  const {navigation} = props;
  _retrieveData().then(r => {
    setFlag(r);
  });

  useEffect(() => {
    fetchMovies(dispatch, flag);
    fetchShows(dispatch, flag);
    return navigation.addListener('focus', () => {
      fetchMovies(dispatch, flag);
      fetchShows(dispatch, flag);
    });
  }, [dispatch, flag, navigation]);

  useEffect(() => {
    getData(setMovieList);
  }, [movieList]);

  useEffect(() => {
    getTvShowData(setTvShowList);
  }, [tvShowList]);

  if (guestRatedMoviesLoading === true || guestRatedTvShowsLoading === true) {
    return (
      <View>
        <MovieLoading />
      </View>
    );
  } else {
    return (
      <ScrollView
        style={{
          backgroundColor: 'black',
        }}>
        <MovieHeader list={'Rated Movies'} />
        <FlatList
          data={guestRatedMoviesData.guestRatedMoviesResults}
          horizontal={true}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <MoviesWatchList results={item} navigation={navigation} />
          )}
        />
        <MovieHeader list={'Rated Tv Shows'} />
        <FlatList
          data={guestRatedTvShowsData.guestRatedTvShowsResults}
          horizontal={true}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TvShowsWatchList results={item} navigation={navigation} />
          )}
        />

        <MovieHeader list={'Movies Watch List'} />
        <FlatList
          data={movieList}
          horizontal={true}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <MoviesFavoritesList results={item} />
          )}></FlatList>

        <MovieHeader list={'Tv Shows Watch List'} />
        <FlatList
          data={tvShowList}
          horizontal={true}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TvShowsFavoritesList results={item} />
          )}></FlatList>
      </ScrollView>
    );
  }
}

export default WatchListPage;
