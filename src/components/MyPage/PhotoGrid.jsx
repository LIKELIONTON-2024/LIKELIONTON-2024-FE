import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";

const PhotoGrid = ({
  images,
  onImagePress,
  getImageStyle,
  lockedImages,
  type,
}) => {
  return (
    <View style={styles.grid}>
      {images.map((image, index) => {
        const isLocked = lockedImages[image.name];

        const lockImage =
          type === "배경"
            ? require("../../assets/images/lockBack.png")
            : require("../../assets/images/lock.png");

        const lockImageStyle =
          type === "배경" ? styles.lockedIconBackground : styles.lockedIconFur;

        return (
          <TouchableOpacity
            key={index}
            style={styles.imageContainer}
            onPress={() => onImagePress(image)}
          >
            <Image source={image.uri} style={getImageStyle()} />
            {isLocked && (
              <View style={styles.overlay}>
                <Image source={lockImage} style={lockImageStyle} />
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageContainer: {
    position: "relative",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  lockedIconFur: {
    width: 140,
    height: 140,
  },
  lockedIconBackground: {
    width: 148,
    height: 270,
  },
});

export default PhotoGrid;
