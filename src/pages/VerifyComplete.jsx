import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { COLOR } from "../styles/color";

const Cat = require("../assets/images/defaultCat.png");
const Snack = require("../assets/icons/snackIcon.png");

const VerifyComplete = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.navigate("Certification");
  };

  return (
    <View style={styles.container}>
      <Image source={Cat} style={styles.catImage} />
      <Text style={styles.title}>인증완료!</Text>
      <TouchableOpacity style={styles.button} onPress={handleGoBack}>
        <Text style={styles.buttonText}>츄르</Text>
        <Image source={Snack} style={styles.snackImage} />
        <Text style={styles.buttonText}>를 한 개 받았어요</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: COLOR.WHITE,
  },
  catImage: {
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLOR.BLUE_300,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  snackImage: {
    width: 30,
    height: 30,
  },
});

export default VerifyComplete;
