import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { COLOR } from "../../styles/color";
const PhotoGrid = ({
  images,
  onImagePress,
  getImageStyle,
  lockedImages,
  type,
  selectedImageName,
}) => {
  return (
    <View style={styles.grid}>
      {images.map((image) => {
        const isLocked = lockedImages[image.name];
        const lockImage =
          type === "background"
            ? require("../../assets/images/lockBack.png")
            : require("../../assets/images/lock.png");

        const lockImageStyle =
          type === "background"
            ? styles.lockedIconBackground
            : styles.lockedIconFur;

        const isSelected = selectedImageName === image.name;

        return (
          <TouchableOpacity
            key={image.name}
            style={[
              styles.imageContainer,
              isSelected && styles.selectedImageContainer,
            ]}
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
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "transparent",
    alignItems: "center",
  },
  selectedImageContainer: {
    borderColor: COLOR.BLUE_400,
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
