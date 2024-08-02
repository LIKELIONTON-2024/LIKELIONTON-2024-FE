import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import SettingSection from "../components/MyPage/SettingSection";
import ProfileSection from "../components/MyPage/ProfileSection";
import TabSection from "../components/MyPage/TabSection";
import { COLOR } from "../styles/color";
import { BaseURL } from "../apis/api";

const accessToken = "your_actual_access_token_here";

const MyPageScreen = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BaseURL}/user/my`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        // 상태 코드와 응답 본문 로깅
        console.log("응답 상태:", response.status);
        const result = await response.json();
        console.log("응답 본문:", result);

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("인증 오류: 토큰이 유효하지 않습니다.");
          } else if (response.status === 403) {
            throw new Error("권한 오류: 접근이 거부되었습니다.");
          } else {
            throw new Error(
              `네트워크 응답이 올바르지 않습니다: ${response.statusText}`
            );
          }
        }

        setData(result);
      } catch (error) {
        console.error("요청 오류:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLOR.BLACK} />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <SettingSection nickname={data.nickname} />
        <ProfileSection nickname={data.nickname} />
        <TabSection data={data} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MyPageScreen;
