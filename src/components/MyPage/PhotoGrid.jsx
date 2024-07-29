import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";

const PhotoGrid = ({ images, onImagePress, getImageStyle }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => onImagePress(item)}
      style={styles.gridItem}
    >
      <Image source={item} style={getImageStyle()} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={images}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      contentContainerStyle={styles.grid}
    />
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 5,
    aspectRatio: 1,
  },
  grid: {
    flexGrow: 1,
  },
});

export default PhotoGrid;
