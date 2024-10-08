import React, { useCallback, useMemo, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Cat from "../assets/images/defaultCat.png";
import { COLOR } from "../styles/color";
import { Margin } from "../components/common/Margin";
import backButton from "../assets/icons/backButtonIcon.png";
import search from "../assets/icons/searchIcon.png";

const SignUp = ({ navigation }) => {
  const BaseURL =
    "http://ec2-43-203-224-22.ap-northeast-2.compute.amazonaws.com:8080";
  const [nickname, setNickname] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [loading, setLoading] = useState(false);

  const nicknameErrorText = useMemo(() => {
    if (nickname.length === 0) {
      return "닉네임을 입력해주세요.";
    }
    if (nickname.length > 8) {
      return "닉네임은 8자리 이내여야 합니다.";
    }
    if (/[^a-zA-Z0-9가-힣]/.test(nickname)) {
      return "닉네임은 한글, 영어, 숫자만 가능합니다.";
    }
    return null;
  }, [nickname]);

  const zipCodeErrorText = useMemo(() => {
    if (zipCode.length === 0) {
      return "도로명 주소를 입력해주세요.";
    }
    return null;
  }, [zipCode]);

  const onChangeNickname = useCallback((text) => {
    setNickname(text);
  }, []);

  const onChangeZipCode = useCallback((text) => {
    setZipCode(text);
  }, []);

  const postData = async () => {
    const email = await AsyncStorage.getItem("email");

    const data = {
      email: JSON.parse(email),
      nickname,
      address: zipCode,
    };

    try {
      const postURL = `${BaseURL}/user/join`;
      const response = await axios.post(postURL, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.isJoined) {
        navigation.navigate("MainTab");
      } else {
        const { accessToken, refreshToken } = response.data;
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);
        navigation.navigate("SplashLogin");
      }
    } catch (error) {
      if (error.response) {
        console.error("서버 응답 데이터:", error.response.data);
        console.error("서버 응답 상태:", error.response.status);
        Alert.alert("유저가 이미 존재합니다.");
      } else {
        console.error("오류 발생:", error.message);
      }
    }
  };

  const nextButtonEnabled = useMemo(() => {
    return nicknameErrorText == null && zipCodeErrorText == null;
  }, [nicknameErrorText, zipCodeErrorText]);

  const nextButtonStyle = useMemo(() => {
    return nextButtonEnabled
      ? styles.nextButton
      : [styles.nextButton, styles.disabledNextButton];
  }, [nextButtonEnabled]);

  const onPressNextButton = useCallback(async () => {
    setLoading(true);
    try {
      await postData();
    } catch (error) {
      console.error("다음 화면으로 이동 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  }, [postData]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.WHITE }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ paddingHorizontal: 14 }}
          >
            <Image source={backButton} style={{ width: 29, height: 29 }} />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 34, paddingTop: 66, gap: 14 }}>
              <Text style={{ fontWeight: "bold", fontSize: 30 }}>
                프로필 설정
              </Text>
              <Text style={{ color: COLOR.GRAY_200 }}>
                프로필은 나중에도 설정할 수 있어요.
              </Text>
              <Margin height={50} />
              <Image
                source={Cat}
                style={{ width: 126, height: 126, alignSelf: "center" }}
              />
            </View>
            <Margin height={13} />
            <View style={{ gap: 11, paddingHorizontal: 34 }}>
              <Text style={{ fontWeight: "semibold", fontSize: 17 }}>
                닉네임
              </Text>
              <TextInput
                value={nickname}
                onChangeText={onChangeNickname}
                autoCapitalize="none"
                style={styles.textInput}
              />
              <Text style={{ color: COLOR.GRAY_200 }}>
                8자리 이내, 한글/영어/숫자 가능, 특수문자 입력불가
              </Text>
              {nicknameErrorText && (
                <Text style={styles.errorText}>{nicknameErrorText}</Text>
              )}
              <Text style={{ fontWeight: "semibold", fontSize: 17 }}>
                집주소
              </Text>
              <View>
                <TextInput
                  value={zipCode}
                  onChangeText={onChangeZipCode}
                  style={styles.textInput}
                />
                <TouchableOpacity style={styles.searchIconContainer}>
                  <Image source={search} style={styles.searchIcon} />
                </TouchableOpacity>
              </View>
              <Text style={{ color: COLOR.GRAY_200 }}>
                장소 인증을 위해 필요해요.
              </Text>
              {zipCodeErrorText && (
                <Text style={styles.errorText}>{zipCodeErrorText}</Text>
              )}
            </View>
          </View>
          <View style={{ paddingHorizontal: 34, paddingVertical: 10 }}>
            <TouchableOpacity
              onPress={onPressNextButton}
              disabled={!nextButtonEnabled || loading}
              style={nextButtonStyle}
            >
              <Text style={styles.nextButtonText}>다음</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: 325,
    height: 47,
    backgroundColor: COLOR.WHITE,
    borderWidth: 0.5,
    borderColor: COLOR.GRAY_200,
    borderRadius: 12,
    padding: 10,
  },
  searchIconContainer: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  nextButton: {
    width: 325,
    height: 51,
    backgroundColor: COLOR.BLUE_400,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  nextButtonText: {
    color: COLOR.WHITE,
  },
  disabledNextButton: {
    backgroundColor: COLOR.BLACK,
  },
  errorText: {
    color: "red",
  },
});

export default SignUp;
