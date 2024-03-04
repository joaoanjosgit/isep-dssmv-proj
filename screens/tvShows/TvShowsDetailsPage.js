import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  ViewPagerAndroid,
  SafeAreaView,
  Alert,
  ImageBackground,
} from 'react-native';
import AppContext from '../../context/AppContext';
import MovieLoading from '../../components/MovieLoading';
import MovieError from '../../components/MovieError';
import {
  API_KEY,
  DEFAULT_URL,
  fetchTvShowsDetails,
  fetchTvShowsDetailsStarted,
} from '../../context/Actions';
import EncryptedStorage from 'react-native/Libraries/Storage/AsyncStorage';

async function storeTvShowWatchList(array) {
  try {
    await EncryptedStorage.setItem('TvShowsWatchList', JSON.stringify(array));
    console.log('saved');
    // Congrats! You've just stored your first value!
  } catch (error) {
    // There was an error on the native side
  }
}

async function retrieveTvShowWatchList() {
  const jsonValue = await EncryptedStorage.getItem('TvShowsWatchList');
  if (jsonValue !== undefined) {
    const list = JSON.parse(jsonValue);
    console.log(list);
    return list;
  }
}

function getData(setWatchList) {
  retrieveTvShowWatchList().then(r => {
    setWatchList(r);
  });
}

function addOrRemove(array, tvShows) {
  if (array !== null) {
    const m = array.findIndex(element => {
      if (element.id === tvShows.id) {
        return true;
      }
      return false;
    });

    if (m !== -1) {
      array.splice(m, 1);

      Alert.alert(
        'Waring!!',
        tvShows.name + ' was removed from your Watch List',
        [{text: 'OK'}],
      );
    } else {
      array.push(tvShows);

      Alert.alert('Waring!!', tvShows.name + ' was added to your Watch List', [
        {text: 'OK'},
      ]);
    }
  } else {
    const newList = [];
    newList.push(tvShows);
    array = newList;

    Alert.alert('Waring!!', tvShows.name + ' was added to your Watch List', [
      {text: 'OK'},
    ]);
  }
  storeTvShowWatchList(array);
}

function TvShowsDetailsPage(props) {
  const {state, dispatch} = useContext(AppContext);
  const {route} = props;
  const id = route.params !== undefined ? route.params.data : null;
  const {tvShowsDetails} = state;
  const {tvShowsDetailsLoading, tvShowsDetailsError, tvShowsDetailsData} =
    tvShowsDetails;
  const {navigation} = props;
  const [watchList, setWatchList] = useState([]);
  const isFound = watchList.some(r => {
    return r.id === tvShowsDetailsData.id;
  });

  useEffect(() => {
    dispatch(fetchTvShowsDetailsStarted(id));
    const url = DEFAULT_URL + '/tv/' + id + API_KEY;
    const request = {};
    fetchTvShowsDetails(url, request, dispatch);
  }, []);

  useEffect(() => {
    getData(setWatchList);
  }, [watchList]);

  if (tvShowsDetailsLoading === true) {
    return (
      <View>
        <MovieLoading />
      </View>
    );
  } else {
    if (tvShowsDetailsError !== null) {
      return (
        <View>
          <MovieError />
        </View>
      );
    } else {
      if (
        tvShowsDetailsData.length !== 0 &&
        tvShowsDetailsData.overview !== ''
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
                    onPress={() => addOrRemove(watchList, tvShowsDetailsData)}>
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
                      tvShowsDetailsData.poster_path,
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
                  {tvShowsDetailsData.name}
                </Text>
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 30,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'midnightblue',
                  }}>
                  {tvShowsDetailsData.vote_average.toFixed(1)}
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
                    Seasons
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
                  {tvShowsDetailsData.first_air_date}
                  <Text>
                    {'              '}
                    {tvShowsDetailsData.number_of_seasons}
                    <Text>
                      {'           '}
                      {tvShowsDetailsData.status}
                      <Text
                        style={{
                          textTransform: 'uppercase',
                        }}>
                        {'         '}
                        {tvShowsDetailsData.original_language}
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
                  {tvShowsDetailsData.overview}
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
                  navigation.navigate('TvShowsRatingPage', {
                    data: tvShowsDetailsData,
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
                    onPress={() => addOrRemove(watchList, tvShowsDetailsData)}>
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
                      tvShowsDetailsData.poster_path,
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
                  {tvShowsDetailsData.name}
                </Text>
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 30,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'midnightblue',
                  }}>
                  {tvShowsDetailsData.vote_average.toFixed(1)}
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
                    Seasons
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
                  {tvShowsDetailsData.first_air_date}
                  <Text>
                    {'              '}
                    {tvShowsDetailsData.number_of_seasons}
                    <Text>
                      {'           '}
                      {tvShowsDetailsData.status}
                      <Text
                        style={{
                          textTransform: 'uppercase',
                        }}>
                        {'         '}
                        {tvShowsDetailsData.original_language}
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
                  {tvShowsDetailsData.overview}
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
                  navigation.navigate('TvShowsRatingPage', {
                    data: tvShowsDetailsData,
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
        tvShowsDetailsData.length !== 0 &&
        tvShowsDetailsData.overview === ''
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
                    onPress={() => addOrRemove(watchList, tvShowsDetailsData)}>
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
                      tvShowsDetailsData.poster_path,
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
                  {tvShowsDetailsData.name}
                </Text>
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 30,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'midnightblue',
                  }}>
                  {tvShowsDetailsData.vote_average.toFixed(1)}
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
                    Seasons
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
                  {tvShowsDetailsData.first_air_date}
                  <Text>
                    {'              '}
                    {tvShowsDetailsData.number_of_seasons}
                    <Text>
                      {'           '}
                      {tvShowsDetailsData.status}
                      <Text
                        style={{
                          textTransform: 'uppercase',
                        }}>
                        {'         '}
                        {tvShowsDetailsData.original_language}
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
                  navigation.navigate('TvShowsRatingPage', {
                    data: tvShowsDetailsData,
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
                    onPress={() => addOrRemove(watchList, tvShowsDetailsData)}>
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
                      tvShowsDetailsData.poster_path,
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
                  {tvShowsDetailsData.name}
                </Text>
                <Text
                  style={{
                    marginTop: 20,
                    fontSize: 30,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'midnightblue',
                  }}>
                  {tvShowsDetailsData.vote_average.toFixed(1)}
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
                    Seasons
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
                  {tvShowsDetailsData.first_air_date}
                  <Text>
                    {'              '}
                    {tvShowsDetailsData.number_of_seasons}
                    <Text>
                      {'           '}
                      {tvShowsDetailsData.status}
                      <Text
                        style={{
                          textTransform: 'uppercase',
                        }}>
                        {'         '}
                        {tvShowsDetailsData.original_language}
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
                  navigation.navigate('TvShowsRatingPage', {
                    data: tvShowsDetailsData,
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

export default TvShowsDetailsPage;
