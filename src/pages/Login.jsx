import React, { useEffect } from "react";
import { Image, Linking, SafeAreaView, View, Alert } from "react-native";
import { Button } from "../components/common/button";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import kakaoIcon from "../assets/icons/kakaoIcon.png";
import googleIcon from "../assets/icons/googleIcon.png";
import naverIcon from "../assets/icons/naverIcon.png";
import { COLOR } from "../styles/color";
import logoImage from "../assets/images/logo.png";
import { BaseURL } from "../apis/api";

export default ({ navigation }) => {
  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get(`${BaseURL}/oauth2/google/login`);
      const GOOGLE_URL = response.data;
      Linking.openURL(GOOGLE_URL);
    } catch (error) {
      console.log("Error during Google login:", error);
    }
  };

  const handleDeepLink = async (event) => {
    const url = event.url;
    const params = new URLSearchParams(url.split("?")[1]);
    const code = params.get("code");

    if (code) {
      try {
        await getUserProfile(code);
      } catch (error) {
        console.log("Error fetching user profile:", error);
      }
    }
  };

  const getUserProfile = async (code) => {
    try {
      const response = await axios.get(
        `${BaseURL}/oauth2/google/user?code=${code}`
      );
      const { isJoined, email } = response.data;

      await AsyncStorage.setItem("email", JSON.stringify(email));

      if (isJoined) {
        navigation.navigate("MainTab");
        const { accessToken, refreshToken } = response.data;
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);
      } else {
        navigation.navigate("Agree");
      }
    } catch (error) {
      console.log("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });
    // 새로운 URL 이벤트 리스너 추가
    const linkingListener = Linking.addEventListener("url", handleDeepLink);

    return () => {
      linkingListener.remove();
    };
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLOR.BLUE_400,
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          gap: 8,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Image source={logoImage} style={{ width: 270, height: 240 }} />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 14,
        }}
      >
        <Button
          onPress={() => navigation.navigate("Agree")}
          icon={kakaoIcon}
          bgColor={COLOR.KAKAOBUTTON}
          text={"카카오로 계속하기"}
        />
        <Button
          onPress={() => navigation.navigate("MainTab")}
          icon={naverIcon}
          bgColor={COLOR.NAVERBUTTON}
          text={"네이버로 계속하기"}
        />
        <Button
          onPress={handleGoogleLogin}
          icon={googleIcon}
          bgColor={COLOR.GRAY_100}
          text={"구글로 계속하기"}
        />
      </View>
    </SafeAreaView>
  );
};
