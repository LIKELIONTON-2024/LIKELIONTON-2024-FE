import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { COLOR } from "../../styles/color";

const Line = require("../../assets/images/line.png");

const ActivitiesScreen = ({ data }) => {
  if (!data) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR"); // 한국 날짜 형식으로 'yyyy년 M월 d일'
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.infoContainerHeaderContainer}>
          <Image source={Line} />
          <Text style={styles.infoContainerHeader}>누적</Text>
          <Image source={Line} />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>걸은 거리:</Text>
            <Text style={styles.infoValue}>{data.totalDistance} km</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>총 인증 횟수:</Text>
            <Text style={styles.infoValue}>{data.totalVisits}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>시작한 날:</Text>
            <Text style={styles.infoValue}>{formatDate(data.startDay)}</Text>
          </View>
        </View>
      </View>
      <View style={styles.badgeContainer}>
        <Image source={{ uri: data.badgeImage }} style={styles.badge} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 34,
    marginTop: 34,
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
    color: COLOR.GRAY_300,
  },
  infoContainer: {
    alignItems: "flex-start",
    marginHorizontal: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 18,
  },
  infoLabel: {
    fontSize: 17,
    color: COLOR.GRAY_400,
    flex: 1,
    textAlign: "left",
    marginRight: 52,
  },
  infoValue: {
    fontSize: 17,
    color: COLOR.GRAY_400,
    flex: 1,
    textAlign: "left",
    fontWeight: "bold",
  },
  badgeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 19,
  },
  badge: {
    width: 93,
    height: 93,
    resizeMode: "contain",
    marginVertical: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ActivitiesScreen;
