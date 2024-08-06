import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { COLOR } from "../styles/color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logoImage from "../assets/images/logo.png";
export default ({ navigation }) => {
  useEffect(() => {
    const checkAuth = async () => {
      // AsyncStorage에서 액세스 토큰 가져오기
      const accessToken = await AsyncStorage.getItem("accessToken");
      // 액세스 토큰이 존재하는지 여부에 따라 네비게이션
      setTimeout(() => {
        if (accessToken) {
          navigation.replace("MainTab"); // 액세스 토큰이 존재하면 MainTab으로 이동
        } else {
          navigation.replace("Login"); // 액세스 토큰이 없으면 Login으로 이동
        }
      }, 1000); // 1초 후에 네비게이션
    };

    checkAuth();
  }, [navigation]);

  return (
    <View style={styles.splashContainer}>
      <View>
        <Image source={logoImage} style={{ width: 158, height: 130 }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.BLUE_400,
  },
});
