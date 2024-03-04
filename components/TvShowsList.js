import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AppContext from '../context/AppContext';

function TvShowsList(props) {
  useContext(AppContext);
  const {results} = props;
  const {navigation} = props;

  if (results.poster_path === null) {
    return (
      <View
        style={{
          padding: 5,
          borderTopWidth: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('TvShowsDetailPage', {
              data: results.id,
            });
          }}>
          <Image
            source={require('./../assets/image_not_found.png')}
            style={{
              width: 100,
              height: 150,
              borderRadius: 10,
              overflow: 'hidden',
              borderWidth: 0.5,
              borderColor: 'white',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View
        style={{
          padding: 5,
          borderTopWidth: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('TvShowsDetailPage', {
              data: results.id,
            });
          }}>
          <Image
            source={{
              width: 100,
              height: 150,
              uri: 'https://image.tmdb.org/t/p/w500' + results.poster_path,
            }}
            style={{
              borderRadius: 10,
              overflow: 'hidden',
              borderWidth: 0.5,
              borderColor: 'white',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
export default TvShowsList;
