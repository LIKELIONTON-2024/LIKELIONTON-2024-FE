import { Image, Linking, SafeAreaView, Text, View, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Button } from "../components/common/button";
import axios from "axios";
import kakaoIcon from "../assets/icons/kakaoIcon.png";
import googleIcon from "../assets/icons/googleIcon.png";
import naverIcon from "../assets/icons/naverIcon.png";
import { COLOR } from "../styles/color";
import { BaseURL } from "../apis/api";
import logoImage from "../assets/images/logo.png";

export default ({ navigation }) => {
  const [authUri, setAuthUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 데이터를 가져오는 함수
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BaseURL}/oauth2/google/login`);
      setAuthUri(response.data.authUri);
    } catch (err) {
      setError("인증 URL을 가져오는 중 오류가 발생했습니다.");
      console.error("Error fetching data:", err);
      Alert.alert("오류", "인증 URL을 가져오는 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 딥링크 처리 함수
  const handleOpenURL = (event) => {
    const { url } = event;
    const codeMatch = url.match(/code=([^&]*)/);

    if (codeMatch) {
      const code = codeMatch[1];

      // 백엔드로 인가 코드를 전달하여 사용자 정보 확인
      axios
        .get(`${BaseURL}/oauth2/google/user?code=${code}`)
        .then((response) => {
          const { isJoined, email } = response.data;
          if (isJoined) {
            // 이미 가입된 유저인 경우 메인 화면으로 이동
            navigation.navigate("MainTab");
          } else {
            // 새로운 유저인 경우 회원가입 화면으로 이동
            navigation.navigate("Agree", { email });
          }
        })
        .catch((error) => {
          console.error("Error during OAuth callback handling:", error);
          Alert.alert("오류", "로그인 처리 중 문제가 발생했습니다.");
        });
    }
  };

  useEffect(() => {
    fetchData();

    // 딥링크 이벤트 리스너 등록
    const linkingListener = Linking.addListener("url", handleOpenURL);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      linkingListener.remove();
    };
  }, []);

  // 인증 URL을 여는 함수
  const openAuthUri = () => {
    if (authUri) {
      Linking.openURL(authUri);
    } else {
      console.log("인증 URL이 없습니다.");
      Alert.alert("오류", "인증 URL을 가져오는 중 문제가 발생했습니다.");
    }
  };

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
          onPress={openAuthUri}
          icon={googleIcon}
          bgColor={COLOR.GRAY_100}
          text={"구글로 계속하기"}
          loading={loading}
          disabled={loading}
        />
      </View>
    </SafeAreaView>
  );
};
