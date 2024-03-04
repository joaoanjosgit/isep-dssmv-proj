import React, {useState, useEffect, useContext} from 'react';
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
  fetchPopularShowsStarted,
  fetchOnAirShowsStarted,
  fetchPopularShows,
  fetchOnAirShows,
} from '../../context/Actions';
import AppContext from '../../context/AppContext';
import TvShowsList from '../../components/TvShowsList';

function TVShowsPage(props) {
  const {state, dispatch} = useContext(AppContext);
  const {popularShows} = state;
  const {onAirShows} = state;
  const {popularLoading, popularError, popularData} = popularShows;
  const {onAirLoading, onAirError, onAirData} = onAirShows;
  const {navigation} = props;

  useEffect(() => {
    dispatch(fetchPopularShowsStarted());
    dispatch(fetchOnAirShowsStarted());

    const popularUrl = DEFAULT_URL + '/tv/popular' + API_KEY;
    const popularRequest = {};

    const onAirUrl = DEFAULT_URL + '/tv/on_the_air' + API_KEY;
    const onAirRequest = {};

    fetchPopularShows(popularUrl, popularRequest, dispatch);
    fetchOnAirShows(onAirUrl, onAirRequest, dispatch);
  }, []);

  if (popularLoading === true && onAirLoading === true) {
    return (
      <View>
        <MovieLoading />
      </View>
    );
  } else {
    if (popularError !== null || onAirError !== null) {
      return (
        <View>
          <MovieError />
        </View>
      );
    } else {
      if (
        popularData.popularResults.length > 0 &&
        onAirData.onAirResults.length > 0
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
                <TvShowsList results={item} navigation={navigation} />
              )}
            />
            <MovieHeader list={'On Air'} />
            <FlatList
              data={onAirData.onAirResults}
              horizontal={true}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TvShowsList results={item} navigation={navigation} />
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

export default TVShowsPage;
