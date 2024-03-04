import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../../context/AppContext';
import {useContext, useState} from 'react';
import {
  API_KEY,
  DEFAULT_URL,
  fetchTvShowRating,
  fetchTvShowRatingStarted,
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

function TvShowsRatingPage(props) {
  const {state, dispatch} = useContext(AppContext);

  const [value, setValue] = useState();
  const [flag, setFlag] = useState();

  const {tvShowRating} = state;
  const {tvShowRatingData} = tvShowRating;

  const {route} = props;
  const data = route.params !== undefined ? route.params : null;

  _retrieveData().then(r => {
    setFlag(r);
  });

  function handleOnClick(id, val) {
    dispatch(fetchTvShowRatingStarted(id));

    const url =
      DEFAULT_URL +
      '/tv/' +
      id.toString() +
      '/rating' +
      API_KEY +
      '&guest_session_id=' +
      flag;

    const request = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'post',
      body: 'value=' + val,
    };

    fetchTvShowRating(url, request, dispatch);
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
      <TextInput
        style={{
          borderBottomWidth: 1,
          borderBottomColor: 'navy',
          textAlign: 'center',
          marginTop: 20,
          color: 'midnightblue',
          fontSize: 20,
        }}
        placeholder={'Rating'}
        placeholderTextColor={'midnightblue'}
        keyboardType={'numeric'}
        maxLength={2}
        onChangeText={vall => setValue(vall)}></TextInput>
      <Text
        style={{
          marginTop: 30,
          marginBottom: 70,
          color: 'black',
          fontSize: 14,
        }}>
        {tvShowRatingData.status_message}
      </Text>
      <TouchableOpacity
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          backgroundColor: 'navy',
          width: 200,
          height: 40,
          borderRadius: 10,
        }}
        onPress={() => handleOnClick(data.data.id, value)}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: 18,
            textAlign: 'center',
          }}>
          Post Rating
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default TvShowsRatingPage;
