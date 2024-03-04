import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import AppContext from '../../context/AppContext';
import MovieLoading from '../../components/MovieLoading';
import MovieError from '../../components/MovieError';
import {
  API_KEY,
  DEFAULT_URL,
  fetchMovieDetails,
  fetchMovieDetailsStarted,
} from '../../context/Actions';

import EncryptedStorage from 'react-native/Libraries/Storage/AsyncStorage';

async function storeUserSession(array) {
  try {
    await EncryptedStorage.setItem('WatchList', JSON.stringify(array));
    console.log('saved');
    // Congrats! You've just stored your first value!
  } catch (error) {
    // There was an error on the native side
  }
}

async function retrieveUserSession() {
  const jsonValue = await EncryptedStorage.getItem('WatchList');
  if (jsonValue !== undefined) {
    const list = JSON.parse(jsonValue);
    console.log(list);
    return list;
  }
}

function getData(setwatchList) {
  retrieveUserSession().then(r => {
    setwatchList(r);
  });
}

function addOrRemove(array, movie) {
  if (array !== null) {
    const m = array.findIndex(element => {
      if (element.id === movie.id) {
        return true;
      }
      return false;
    });

    if (m !== -1) {
      array.splice(m, 1);

      Alert.alert(
        'Waring!!',
        movie.title + ' was removed from your Watch List',
        [{text: 'OK'}],
      );
    } else {
      array.push(movie);

      Alert.alert('Waring!!', movie.title + ' was added to your Watch List', [
        {text: 'OK'},
      ]);
    }
  } else {
    const newList = [];
    newList.push(movie);
    array = newList;

    Alert.alert('Waring!!', movie.title + ' was added to your Watch List', [
      {text: 'OK'},
    ]);
  }
  storeUserSession(array);
}

function MovieDetailsPage(props) {
  const {state, dispatch} = useContext(AppContext);
  const {route} = props;
  const id = route.params !== undefined ? route.params.data : null;
  const {movieDetails} = state;
  const {movieDetailsLoading, movieDetailsError, movieDetailsData} =
    movieDetails;
  const {navigation} = props;
  const [watchList, setwatchList] = useState([]);
  const isFound = watchList.some(r => {
    return r.id === movieDetailsData.id;
  });

  useEffect(() => {
    dispatch(fetchMovieDetailsStarted(id));
    const url = DEFAULT_URL + '/movie/' + id + API_KEY;
    const request = {};
    fetchMovieDetails(url, request, dispatch);
  }, []);

  useEffect(() => {
    getData(setwatchList);
  }, [watchList]);

  if (movieDetailsLoading === true) {
    return (
      <View>
        <MovieLoading />
      </View>
    );
  } else {
    if (movieDetailsError !== null) {
      return (
        <View>
          <MovieError />
        </View>
      );
    } else {
      if (movieDetailsData.length !== 0 && movieDetailsData.overview !== '') {
        if (isFound === false) {
          return (
            <View
              style={{
                flex: 1,
                backgroundColor: '#e6e6fa',
              }}>
              <ScrollView>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    paddingTop: 10,
                    paddingRight: 10,
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#e6e6fa',
                      width: 50,
                      height: 50,
                    }}
                    onPress={() => addOrRemove(watchList, movieDetailsData)}>
                    <ImageBackground
                      source={require('../../assets/add_favorites.jpg')}
                      style={{
                        height: 50,
                        width: 50,
                        position: 'absolute',
                      }}></ImageBackground>
                  </TouchableOpacity>
                </View>

                <Image
                  source={{
                    width: 200,
                    height: 300,
                    uri:
                      'https://image.tmdb.org/t/p/w500' +
                      movieDetailsData.poster_path,
                  }}
                  style={{
                    marginTop: 8,
                    borderRadius: 10,
                    overflow: 'hidden',
                    borderWidth: 0.5,
                    alignSelf: 'center',
                    borderColor: 'white',
                  }}
                />
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 20,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'midnightblue',
                  }}>
                  {movieDetailsData.title}
                </Text>
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 30,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'midnightblue',
                  }}>
                  {movieDetailsData.vote_average.toFixed(1)}
                </Text>
                <Text
                  style={{
                    opacity: 0.6,
                    marginTop: 20,
                    fontSize: 15,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'midnightblue',
                  }}>
                  Release
                  <Text>
                    {'             '}
                    Runtime
                    <Text>
                      {'             '}
                      Status
                      <Text> {'           '}Language</Text>
                    </Text>
                  </Text>
                </Text>
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 15,
                    marginLeft: 7,
                    fontWeight: 'bold',
                    color: 'midnightblue',
                  }}>
                  {movieDetailsData.release_date}
                  <Text>
                    {'         '}
                    {movieDetailsData.runtime} min
                    <Text>
                      {'           '}
                      {movieDetailsData.status}
                      <Text
                        style={{
                          textTransform: 'uppercase',
                        }}>
                        {'             '}
                        {movieDetailsData.original_language}
                      </Text>
                    </Text>
                  </Text>
                </Text>
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: 'midnightblue',
                  }}>
                  Storyline:
                </Text>
                <Text
                  style={{
                    opacity: 0.6,
                    marginTop: 6,
                    marginLeft: 6,
                    marginBottom: 100,
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: 'midnightblue',
                  }}>
                  {movieDetailsData.overview}
                </Text>
              </ScrollView>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  alignItems: 'center',
                  bottom: 20,
                  marginVertical: 5,
                  marginHorizontal: '25%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  backgroundColor: 'navy',
                  width: 200,
                  height: 40,
                  borderRadius: 10,
                }}
                onPress={() =>
                  navigation.navigate('MovieRatingPage', {
                    data: movieDetailsData,
                  })
                }>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: 18,
                    textAlign: 'center',
                  }}>
                  Give a Rating
                </Text>
              </TouchableOpacity>
            </View>
          );
        } else {
          return (
            <View
              style={{
                flex: 1,
                backgroundColor: '#e6e6fa',
              }}>
              <ScrollView>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    paddingTop: 10,
                    paddingRight: 10,
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#e6e6fa',
                      width: 50,
                      height: 50,
                    }}
                    onPress={() => addOrRemove(watchList, movieDetailsData)}>
                    <ImageBackground
                      source={require('../../assets/added_in_favorites.jpg')}
                      style={{
                        height: 50,
                        width: 50,
                        position: 'absolute',
                      }}></ImageBackground>
                  </TouchableOpacity>
                </View>

                <Image
                  source={{
                    width: 200,
                    height: 300,
                    uri:
                      'https://image.tmdb.org/t/p/w500' +
                      movieDetailsData.poster_path,
                  }}
                  style={{
                    marginTop: 8,
                    borderRadius: 10,
                    overflow: 'hidden',
                    borderWidth: 0.5,
                    alignSelf: 'center',
                    borderColor: 'white',
                  }}
                />
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 20,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'midnightblue',
                  }}>
                  {movieDetailsData.title}
                </Text>
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 30,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'midnightblue',
                  }}>
                  {movieDetailsData.vote_average.toFixed(1)}
                </Text>
                <Text
                  style={{
                    opacity: 0.6,
                    marginTop: 20,
                    fontSize: 15,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'midnightblue',
                  }}>
                  Release
                  <Text>
                    {'             '}
                    Runtime
                    <Text>
                      {'             '}
                      Status
                      <Text> {'           '}Language</Text>
                    </Text>
                  </Text>
                </Text>
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 15,
                    marginLeft: 7,
                    fontWeight: 'bold',
                    color: 'midnightblue',
                  }}>
                  {movieDetailsData.release_date}
                  <Text>
                    {'         '}
                    {movieDetailsData.runtime} min
                    <Text>
                      {'           '}
                      {movieDetailsData.status}
                      <Text
                        style={{
                          textTransform: 'uppercase',
                        }}>
                        {'             '}
                        {movieDetailsData.original_language}
                      </Text>
                    </Text>
                  </Text>
                </Text>
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: 'midnightblue',
                  }}>
                  Storyline:
                </Text>
                <Text
                  style={{
                    opacity: 0.6,
                    marginTop: 6,
                    marginLeft: 6,
                    marginBottom: 100,
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: 'midnightblue',
                  }}>
                  {movieDetailsData.overview}
                </Text>
              </ScrollView>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  alignItems: 'center',
                  bottom: 20,
                  marginVertical: 5,
                  marginHorizontal: '25%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  backgroundColor: 'navy',
                  width: 200,
                  height: 40,
                  borderRadius: 10,
                }}
                onPress={() =>
                  navigation.navigate('MovieRatingPage', {
                    data: movieDetailsData,
                  })
                }>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: 18,
                    textAlign: 'center',
                  }}>
                  Give a Rating
                </Text>
              </TouchableOpacity>
            </View>
          );
        }
      } else if (
        movieDetailsData.length !== 0 &&
        movieDetailsData.overview === ''
      ) {
        if (isFound === false) {
          return (
            <View
              style={{
                flex: 1,
                backgroundColor: '#e6e6fa',
              }}>
              <ScrollView>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    paddingTop: 10,
                    paddingRight: 10,
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#e6e6fa',
                      width: 50,
                      height: 50,
                    }}
                    onPress={() => addOrRemove(watchList, movieDetailsData)}>
                    <ImageBackground
                      source={require('../../assets/add_favorites.jpg')}
                      style={{
                        height: 50,
                        width: 50,
                        position: 'absolute',
                      }}></ImageBackground>
                  </TouchableOpacity>
                </View>

                <Image
                  source={{
                    width: 200,
                    height: 300,
                    uri:
                      'https://image.tmdb.org/t/p/w500' +
                      movieDetailsData.poster_path,
                  }}
                  style={{
                    marginTop: 8,
                    borderRadius: 10,
                    overflow: 'hidden',
                    borderWidth: 0.5,
                    alignSelf: 'center',
                    borderColor: 'white',
                  }}
                />
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 20,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'midnightblue',
                  }}>
                  {movieDetailsData.title}
                </Text>
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 30,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'midnightblue',
                  }}>
                  {movieDetailsData.vote_average.toFixed(1)}
                </Text>
                <Text
                  style={{
                    opacity: 0.6,
                    marginTop: 20,
                    fontSize: 15,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'midnightblue',
                  }}>
                  Release
                  <Text>
                    {'             '}
                    Runtime
                    <Text>
                      {'             '}
                      Status
                      <Text> {'           '}Language</Text>
                    </Text>
                  </Text>
                </Text>
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 15,
                    marginLeft: 7,
                    fontWeight: 'bold',
                    color: 'midnightblue',
                  }}>
                  {movieDetailsData.release_date}
                  <Text>
                    {'         '}
                    {movieDetailsData.runtime} min
                    <Text>
                      {'           '}
                      {movieDetailsData.status}
                      <Text
                        style={{
                          textTransform: 'uppercase',
                        }}>
                        {'             '}
                        {movieDetailsData.original_language}
                      </Text>
                    </Text>
                  </Text>
                </Text>
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: 'midnightblue',
                  }}>
                  Storyline:
                </Text>
                <Text
                  style={{
                    opacity: 0.6,
                    marginTop: 6,
                    marginLeft: 6,
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: 'midnightblue',
                  }}>
                  No available information
                </Text>
              </ScrollView>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  alignItems: 'center',
                  bottom: 20,
                  marginVertical: 5,
                  marginHorizontal: '25%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  backgroundColor: 'navy',
                  width: 200,
                  height: 40,
                  borderRadius: 10,
                }}
                onPress={() =>
                  navigation.navigate('MovieRatingPage', {
                    data: movieDetailsData,
                  })
                }>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: 18,
                    textAlign: 'center',
                  }}>
                  Give a Rating
                </Text>
              </TouchableOpacity>
            </View>
          );
        } else {
          return (
            <View
              style={{
                flex: 1,
                backgroundColor: '#e6e6fa',
              }}>
              <ScrollView>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    paddingTop: 10,
                    paddingRight: 10,
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#e6e6fa',
                      width: 50,
                      height: 50,
                    }}
                    onPress={() => addOrRemove(watchList, movieDetailsData)}>
                    <ImageBackground
                      source={require('../../assets/added_in_favorites.jpg')}
                      style={{
                        height: 50,
                        width: 50,
                        position: 'absolute',
                      }}></ImageBackground>
                  </TouchableOpacity>
                </View>

                <Image
                  source={{
                    width: 200,
                    height: 300,
                    uri:
                      'https://image.tmdb.org/t/p/w500' +
                      movieDetailsData.poster_path,
                  }}
                  style={{
                    marginTop: 8,
                    borderRadius: 10,
                    overflow: 'hidden',
                    borderWidth: 0.5,
                    alignSelf: 'center',
                    borderColor: 'white',
                  }}
                />
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 20,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'midnightblue',
                  }}>
                  {movieDetailsData.title}
                </Text>
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 30,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'midnightblue',
                  }}>
                  {movieDetailsData.vote_average.toFixed(1)}
                </Text>
                <Text
                  style={{
                    opacity: 0.6,
                    marginTop: 20,
                    fontSize: 15,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'midnightblue',
                  }}>
                  Release
                  <Text>
                    {'             '}
                    Runtime
                    <Text>
                      {'             '}
                      Status
                      <Text> {'           '}Language</Text>
                    </Text>
                  </Text>
                </Text>
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 15,
                    marginLeft: 7,
                    fontWeight: 'bold',
                    color: 'midnightblue',
                  }}>
                  {movieDetailsData.release_date}
                  <Text>
                    {'         '}
                    {movieDetailsData.runtime} min
                    <Text>
                      {'           '}
                      {movieDetailsData.status}
                      <Text
                        style={{
                          textTransform: 'uppercase',
                        }}>
                        {'             '}
                        {movieDetailsData.original_language}
                      </Text>
                    </Text>
                  </Text>
                </Text>
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: 'midnightblue',
                  }}>
                  Storyline:
                </Text>
                <Text
                  style={{
                    opacity: 0.6,
                    marginTop: 6,
                    marginLeft: 6,
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: 'midnightblue',
                  }}>
                  No available information
                </Text>
              </ScrollView>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  alignItems: 'center',
                  bottom: 20,
                  marginVertical: 5,
                  marginHorizontal: '25%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  backgroundColor: 'navy',
                  width: 200,
                  height: 40,
                  borderRadius: 10,
                }}
                onPress={() =>
                  navigation.navigate('MovieRatingPage', {
                    data: movieDetailsData,
                  })
                }>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: 18,
                    textAlign: 'center',
                  }}>
                  Give a Rating
                </Text>
              </TouchableOpacity>
            </View>
          );
        }
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

export default MovieDetailsPage;
