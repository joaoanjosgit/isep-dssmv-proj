/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import type {Node} from 'react';
import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import AppProvider from './context/AppProvider';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

import MoviesPage from './screens/movies/MoviesPage';
import TVShowsPage from './screens/tvShows/TVShowsPage';
import WatchListPage from './screens/watchList/WatchListPage';
import MovieDetailsPage from './screens/movies/MovieDetailsPage';
import MovieRatingPage from './screens/movies/MovieRatingPage';

import GuestSession from './GuestSession';

import TvShowsRatingPage from './screens/tvShows/TvShowsRatingPage';
import TvShowsDetailsPage from './screens/tvShows/TvShowsDetailsPage';
import MovieDeleteRatingPage from './screens/watchList/MovieDeleteRatingPage';
import TvShowDeleteRatingPage from './screens/watchList/TvShowDeleteRatingPage';
import {Image, View} from 'react-native';

const Tabs = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Movies"
      component={MoviesPage}
      options={{
        title: 'Movies',
        tabBarIcon: () => {
          return (
            <Image
              style={{
                width: 30,
                height: 30,
              }}
              source={require('../Project_React/assets/movie_clapper.png')}
            />
          );
        },
      }}
    />
    <Tab.Screen
      name="TV Shows"
      component={TVShowsPage}
      options={{
        title: 'TV Shows',
        tabBarIcon: () => {
          return (
            <Image
              style={{
                width: 35,
                height: 35,
              }}
              source={require('../Project_React/assets/tv.png')}
            />
          );
        },
      }}
    />
    <Tab.Screen
      name="Watch List"
      component={WatchListPage}
      options={{
        title: 'Watch List',
        tabBarIcon: () => {
          return (
            <Image
              style={{
                width: 35,
                height: 35,
              }}
              source={require('../Project_React/assets/user.png')}
            />
          );
        },
      }}
    />
  </Tab.Navigator>
);

function App() {
  return (
    <AppProvider>
      <GuestSession />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Tabs"
            component={Tabs}
            options={{headerShown: false}}
          />
          <Stack.Screen name="MovieDetailsPage" component={MovieDetailsPage} />
          <Stack.Screen name="MovieRatingPage" component={MovieRatingPage} />
          <Stack.Screen
            name={'TvShowsDetailPage'}
            component={TvShowsDetailsPage}
          />
          <Stack.Screen
            name={'TvShowsRatingPage'}
            component={TvShowsRatingPage}
          />
          <Stack.Screen
            name={'MovieDeleteRatingPage'}
            component={MovieDeleteRatingPage}
          />
          <Stack.Screen
            name={'TvShowDeleteRatingPage'}
            component={TvShowDeleteRatingPage}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;
