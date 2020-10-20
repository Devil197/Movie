import React from 'react';
import {View, FlatList, Animated} from 'react-native';
import MovieItems from '../items/movieItems';

function MovieList({data}) {
  const scrollX = new Animated.Value(0);
  if (data && data.length) {
    return (
      <View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => 'key: ' + index}
          vertical
          snapToAlignment="center"
          numColumns={3}
          renderItem={({item}) => {
            return <MovieItems item={item} />;
          }}
        />
      </View>
    );
  }

  return null;
}

export default MovieList;
