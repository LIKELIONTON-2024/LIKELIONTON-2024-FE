import React from "react";
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
    fontSize: 18,
    color: "gray",
  },
});

export default NoMapView;
