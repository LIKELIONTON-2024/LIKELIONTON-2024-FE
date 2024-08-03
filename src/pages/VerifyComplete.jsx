import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import axios from "axios";
import { COLOR } from "../styles/color";
import ImageRenderer from "../components/ImageRender";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseURL } from "../apis/api";

const Snack = require("../assets/icons/snackIcon.png");

const VerifyComplete = ({ navigation, route }) => {
  const { spotId } = route.params || {};

  useEffect(() => {
    if (spotId) {
      console.log("Received spotId:", spotId);
    } else {
      console.warn("spotId is undefined");
    }
  }, [spotId]);

  const handleGoBack = () => {
    navigation.navigate("Certification");
  };

  const handleClaimSnack = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("로그인 정보가 없습니다.");
      }

      if (!spotId) {
        throw new Error("Spot ID가 전달되지 않았습니다.");
      }

      console.log("Sending visit verification request...");

      const response = await axios.post(
        `${BaseURL}/visit/create?spotId=${spotId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API response:", response.data);

      navigation.navigate("Certification");
    } catch (error) {
      console.error("Error during visit verification:", error.message);
    }
  };

  return (
    <ImageRenderer>
      <Text style={styles.title}>인증완료!</Text>
      <TouchableOpacity style={styles.button} onPress={handleClaimSnack}>
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
