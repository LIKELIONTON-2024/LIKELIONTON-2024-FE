import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

import { COLOR } from "../../styles/color";

const Line = require("../../assets/images/line.png");
const Badge = require("../../assets/images/badge.png");

const ActivitiesScreen = () => (
  <ScrollView>
    <View style={styles.container}>
      <View style={styles.infoContainerHeaderContainer}>
        <Image source={Line} />
        <Text style={styles.infoContainerHeader}> 누적 </Text>
        <Image source={Line} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>걸은 거리</Text>
        <Text style={styles.infoText}>방문한 스팟</Text>
        <Text style={styles.infoText}>총 인증 횟수</Text>
        <Text style={styles.infoText}>시작한 날</Text>
      </View>
    </View>
    <View style={styles.badgeContainer}>
      <Image source={Badge} />
      <Image source={Badge} />
      <Image source={Badge} />
    </View>
  </ScrollView>
);

// TODO: margin 값! 배지 부분!
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 34,
    marginTop: 14,
    marginBottom: 5,
  },
  infoContainerHeaderContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 29,
    marginBottom: 18,
  },
  infoContainerHeader: {
    fontSize: 17,
    color: "#505053",
  },
  infoContainer: {
    alignItems: "flex-start",
    marginHorizontal: 42,
  },
  infoText: {
    fontSize: 17,
    color: "#333",
    marginBottom: 18,
  },
  badgeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 19,
  },
});

export default ActivitiesScreen;
