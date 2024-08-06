import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const GoBack = require("../../assets/icons/backButtonIcon.png");

const BasicHeader = ({ toScreen, onBackPress }) => {
  const navigation = useNavigation();

  const handleBackPress = async () => {
    if (onBackPress) {
      await onBackPress();
    }
    navigation.navigate(toScreen);
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Image source={GoBack} style={styles.goBackImage} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  backButton: {
    position: "absolute",
    left: 14,
  },
  goBackImage: {
    height: 29,
    width: 29,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default BasicHeader;
