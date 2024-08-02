import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ImageRenderer from "../../components/ImageRender";
import { COLOR } from "../../styles/color";

const NoMapView = () => (
  <ImageRenderer>
    <View style={styles.noMapContainer}>
      <Text style={styles.noMapText}>오늘은 인증 완료!</Text>
    </View>
  </ImageRenderer>
);

const styles = StyleSheet.create({
  noMapContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  noMapText: {
    marginTop: 40,
    fontSize: 18,
    fontWeight: "bold",
    color: COLOR.GRAY_300,
  },
});

export default NoMapView;
