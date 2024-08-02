import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { COLOR } from "../styles/color";
import ImageRenderer from "../components/ImageRender";

const Snack = require("../assets/icons/snackIcon.png");

const VerifyComplete = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.navigate("Certification");
  };

  return (
    <ImageRenderer>
      <Text style={styles.title}>인증완료!</Text>
      <TouchableOpacity style={styles.button} onPress={handleGoBack}>
        <Text style={styles.buttonText}>츄르</Text>
        <Image source={Snack} style={styles.snackImage} />
        <Text style={styles.buttonText}>를 한 개 받았어요</Text>
      </TouchableOpacity>
    </ImageRenderer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    zIndex: 1,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLOR.BLUE_300,
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  buttonText: {
    fontSize: 18,
    marginHorizontal: 10,
    color: COLOR.WHITE,
  },
  snackImage: {
    width: 30,
    height: 30,
  },
});

export default VerifyComplete;
