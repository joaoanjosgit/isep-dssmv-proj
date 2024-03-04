import React, {useContext} from 'react';
import AppContext from '../context/AppContext';
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {color} from 'react-native-reanimated';

function TvShowsWatchList(props) {
  useContext(AppContext);
  const {navigation} = props;
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('TvShowDeleteRatingPage', {
                data: results,
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
              }}></Image>
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
              navigation.navigate('TvShowDeleteRatingPage', {
                data: results,
              });
            }}>
            <ImageBackground
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
              }}>
              <View
                style={{
                  position: 'absolute',
                  left: 75,
                }}>
                <View
                  style={{
                    padding: 7.5,
                    backgroundColor: '#ffa602',
                    borderRadius: 25,
                  }}>
                  <Text style={{color: 'black', textAlign: 'center'}}>
                    {results.rating}
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      );
    }
  }
}
export default TvShowsWatchList;
