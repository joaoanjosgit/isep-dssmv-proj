import React from 'react';
import {View, Text} from 'react-native';

const MovieHeader = props => {
  return (
    <View
      style={{
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'black',
        padding: 5,
      }}>
      <Text style={{fontSize: 20, color: 'white'}}>{props.list}</Text>
    </View>
  );
};
export default MovieHeader;
