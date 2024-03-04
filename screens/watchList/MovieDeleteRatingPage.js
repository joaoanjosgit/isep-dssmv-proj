import React, {useContext, useState} from 'react';
import AppContext from '../../context/AppContext';
import {
  Button,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  API_KEY,
  DEFAULT_URL,
  deleteMovieRatingStarted,
  deleteMovieRatingApi,
} from '../../context/Actions';

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

function MovieDeleteRatingPage(props) {
  const {state, dispatch} = useContext(AppContext);

  const [flag, setFlag] = useState();

  const {deleteMovieRating} = state;
  const {deleteMovieRatingData} = deleteMovieRating;

  const {route} = props;
  const {navigation} = props;
  const data = route.params !== undefined ? route.params : null;
  _retrieveData().then(r => {
    setFlag(r);
  });

  function handleOnClick(id) {
    dispatch(deleteMovieRatingStarted(id));
    const url =
      DEFAULT_URL +
      '/movie/' +
      id.toString() +
      '/rating' +
      API_KEY +
      '&guest_session_id=' +
      flag;
    const request = {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      method: 'delete',
    };
    deleteMovieRatingApi(url, request, dispatch);

    if (deleteMovieRating.status_code === 13) {
      navigation.navigate('Tabs');
    }
    console.log(deleteMovieRating.deleteMovieRatingSuccess);
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#e6e6fa',
      }}>
      {data && (
        <Image
          source={{
            width: 200,
            height: 300,
            uri: 'https://image.tmdb.org/t/p/w500' + data.data.poster_path,
          }}
          style={{
            marginTop: 40,
            borderRadius: 10,
            overflow: 'hidden',
            borderWidth: 0.5,
            alignSelf: 'center',
            borderColor: 'white',
          }}
        />
      )}
      <Text
        style={{
          opacity: 0.6,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 50,
          color: 'midnightblue',
          fontSize: 20,
        }}>
        Your Rating
        <Text>{'              '} Community Rating</Text>
      </Text>
      <Text
        style={{
          fontWeight: 'bold',
          marginLeft: 70,
          marginTop: 10,
          color: 'midnightblue',
          fontSize: 20,
        }}>
        {data.data.rating}
        <Text>
          {'                                     '}
          {data.data.vote_average.toFixed(1)}
        </Text>
      </Text>
      <Text
        style={{
          marginTop: 30,
          marginBottom: 30,
          color: 'black',
          fontSize: 14,
        }}>
        {deleteMovieRatingData.status_message}
      </Text>
      <TouchableOpacity
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          backgroundColor: 'red',
          width: 200,
          height: 40,
          borderRadius: 10,
        }}
        onPress={() => handleOnClick(data.data.id)}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
          }}>
          Delete
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default MovieDeleteRatingPage;
