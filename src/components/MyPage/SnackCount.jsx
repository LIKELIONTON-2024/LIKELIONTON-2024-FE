import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { COLOR } from "../../styles/color";

const SnackIcon = require("../../assets/icons/snackIcon.png");

const SnackCount = ({ totalChuru }) => {
  return (
    <View style={styles.snackContainer}>
      <Text style={styles.snack}>츄르</Text>
      <Image source={SnackIcon} style={styles.snackImg} />
      <Text style={styles.snackCount}>{totalChuru}</Text>
      <Text style={styles.snack}>개</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  snackContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 119,
    height: 35,
    backgroundColor: COLOR.YELLOW_100,
    borderRadius: 20,
    marginTop: 11,
    marginRight: 13,
  },
  snack: {
    fontSize: 15,
  },
  snackImg: {
    height: 16,
    width: 16,
    marginLeft: 2,
    marginRight: 1,
  },
  snackCount: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLOR.BLUE_300,
    marginRight: 1,
  },
});

export default SnackCount;
