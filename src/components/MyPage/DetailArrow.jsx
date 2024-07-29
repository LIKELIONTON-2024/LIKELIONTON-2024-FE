import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
const DetailArrowIcon = require("../../assets/icons/detailArrow.png");
const DetailArrow = ({ title, toScreen }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={() => navigation.navigate(toScreen)}>
        <Image source={DetailArrowIcon} style={styles.detailArrow} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    borderBottomColor: "#e1e1e7",
    borderBottomWidth: 0.5,
    height: 44,
    paddingLeft: 25,
    paddingRight: 14,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 17,
    fontWeight: "medium",
  },
  detailArrow: {
    width: 24,
    height: 24,
  },
});

export default DetailArrow;
