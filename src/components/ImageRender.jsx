import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import useFetchUserImages from "../hooks/useFetchUserImages";

const ImageRenderer = ({
  showInventoryImage = true,
  showBackgroundImage = true,
  children,
}) => {
  const { data, loading, error } = useFetchUserImages();

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text>No data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {showBackgroundImage && (
        <Image
          source={{ uri: data.inventoryBackgroundImage }}
          style={styles.backgroundImage}
        />
      )}
      {showInventoryImage && data.inventoryImage && (
        <Image
          source={{ uri: data.inventoryImage }}
          style={styles.inventoryImage}
        />
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: "cover",
  },
  inventoryImage: {
    width: 218,
    height: 218,
    position: "absolute",
    top: 200,
  },
});

export default ImageRenderer;
