import React from "react";
import { Image, View, StyleSheet } from "react-native";

const LeftArrow = () => (
  <View style={styles.arrowContainer}>
    <Image
      source={require("../../assets/images/leftArrow.png")}
      style={styles.arrow}
    />
  </View>
);

const RightArrow = () => (
  <View style={styles.arrowContainer}>
    <Image
      source={require("../../assets/images/rightArrow.png")}
      style={styles.arrow}
    />
  </View>
);

const styles = StyleSheet.create({
  arrowContainer: {
    padding: 10,
  },
  arrow: {
    width: 10,
    height: 10,
  },
});

export { LeftArrow, RightArrow };
