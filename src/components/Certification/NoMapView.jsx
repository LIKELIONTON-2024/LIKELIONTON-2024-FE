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

import { StyleSheet, View, Text } from "react-native";

const NoMapView = () => (
  <View style={styles.noMapContainer}>
    <Text style={styles.noMapText}>오늘 인증 완료!</Text>
  </View>
);

const styles = StyleSheet.create({
  noMapContainer: {

    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noMapText: {
    marginTop: 40,
    fontSize: 18,
    fontWeight: "bold",
    color: COLOR.GRAY_300,
    fontSize: 18,
    color: "gray",
  },
});

export default NoMapView;
