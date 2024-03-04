import React, {useState, useEffect, useContext, Component} from 'react';
import MovieError from '../../components/MovieError';
import MovieHeader from '../../components/MovieHeader';
import MovieList from '../../components/MovieList';
import MovieLoading from '../../components/MovieLoading';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  DEFAULT_URL,
  API_KEY,
  fetchPopularMoviesStarted,
  fetchTopRatedMoviesStarted,
  fetchPopularMovies,
  fetchTopRatedMovies,
} from '../../context/Actions';
import AppContext from '../../context/AppContext';
import {createStackNavigator} from '@react-navigation/stack';
import MovieDetailsPage from './MovieDetailsPage';
import {NavigationContainer} from '@react-navigation/native';

function MoviesPage(props) {
  const {state, dispatch} = useContext(AppContext);
  const {popularMovies} = state;
  const {topRatedMovies} = state;
  const {popularLoading, popularError, popularData} = popularMovies;
  const {topRatedLoading, topRatedError, topRatedData} = topRatedMovies;
  const {navigation} = props;

  useEffect(() => {
    dispatch(fetchPopularMoviesStarted());
    dispatch(fetchTopRatedMoviesStarted());

    const popularUrl = DEFAULT_URL + '/movie/popular' + API_KEY;
    const popularRequest = {method: 'get'}; //get is default, I think...

    const topRatedUrl = DEFAULT_URL + '/movie/top_rated' + API_KEY;
    const topRatedRequest = {};

    fetchPopularMovies(popularUrl, popularRequest, dispatch);
    fetchTopRatedMovies(topRatedUrl, topRatedRequest, dispatch);
  }, []);

  if (popularLoading === true && topRatedLoading === true) {
    return (
      <View>
        <MovieLoading />
      </View>
    );
  } else {
    if (popularError !== null || topRatedError !== null) {
      return (
        <View>
          <MovieError />
        </View>
      );
    } else {
      if (
        popularData.popularResults.length > 0 &&
        topRatedData.topRatedResults.length > 0
      ) {
        return (
          <ScrollView
            style={{
              backgroundColor: 'black',
            }}>
            <MovieHeader list={'Popular'} />
            <FlatList
              data={popularData.popularResults}
              horizontal={true}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <MovieList results={item} navigation={navigation} />
              )}
            />
            <MovieHeader list={'Top Rated'} />
            <FlatList
              data={topRatedData.topRatedResults}
              horizontal={true}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <MovieList results={item} navigation={navigation} />
              )}
            />
          </ScrollView>
        );
      } else {
        return (
          <View>
            <Text>No data ....</Text>
          </View>
        );
      }
    }
  }
}

export default MoviesPage;
