import React, {useContext} from 'react';
import AppContext from '../context/AppContext';
import {Image, Text, View} from 'react-native';

function TvShowsFavoritesList(props) {
  useContext(AppContext);
  const {results} = props;

  if (results === undefined) {
    return (
      <View>
        <Text
          style={{
            color: 'white',
            padding: 5,
            fontSize: 20,
          }}>
          No data ....
        </Text>
      </View>
    );
  } else {
    if (results.poster_path === null) {
      return (
        <View
          style={{
            padding: 5,
            borderTopWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
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
            }}></Image>
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
          <Image
            source={{
              uri: 'https://image.tmdb.org/t/p/w500' + results.poster_path,
            }}
            style={{
              width: 100,
              height: 150,
              overflow: 'hidden',
              borderRadius: 10,
              borderWidth: 0.5,
              borderColor: 'white',
            }}></Image>
        </View>
      );
    }
  }
}
export default TvShowsFavoritesList;
