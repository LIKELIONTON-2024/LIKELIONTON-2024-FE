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
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const MyPageScreen = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("로그인 정보가 없습니다.");
        }

        const response = await axios.get(`${BaseURL}/user/my`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        console.log("응답 상태:", response.status);
        console.log("응답 본문:", response.data);
        setData(response.data);
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
