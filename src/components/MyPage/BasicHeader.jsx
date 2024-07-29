import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const GoBack = require("../../assets/icons/backButtonIcon.png");

const BasicHeader = ({ title, toScreen }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => navigation.navigate(toScreen)}
        style={styles.backButton}
      >
        <Image source={GoBack} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 55,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  backButton: {
    position: "absolute",
    left: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default BasicHeader;
