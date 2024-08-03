import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { COLOR } from "../../styles/color";

const SnackIcon = require("../../assets/icons/snackIcon.png");

const SaleSnack = ({ snackCount }) => {
  if (snackCount === undefined || snackCount === null) {
    return (
      <View style={styles.snackContainer}>
        <Text style={styles.snack}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.snackContainer}>
      <Text style={styles.snack}>츄르</Text>
      <Image source={SnackIcon} style={styles.snackImg} />
      <Text style={styles.snackCount}>{snackCount}</Text>
      <Text style={styles.snack}>개로 구매 가능</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  snackContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 187,
    height: 35,
    backgroundColor: COLOR.YELLOW_100,
    borderRadius: 20,
    marginBottom: 21,
    paddingHorizontal: 10,
  },
  snack: {
    fontSize: 15,
  },
  snackImg: {
    height: 16,
    width: 16,
    marginHorizontal: 4,
  },
  snackCount: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLOR.BLUE_300,
    marginHorizontal: 4,
  },
});

export default SaleSnack;
