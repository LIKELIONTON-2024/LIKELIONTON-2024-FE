import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  RefreshControl,
} from "react-native";
import SettingSection from "../components/MyPage/SettingSection";
import ProfileSection from "../components/MyPage/ProfileSection";
import TabSection from "../components/MyPage/TabSection";
import { COLOR } from "../styles/color";
import { BaseURL } from "../apis/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const LoadingCat = require("../assets/images/loadingcat.png");

const MyPageScreen = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
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

      // console.log("응답 상태:", response.status);
      // console.log("응답 헤더:", response.headers);
      // console.log("응답 본문:", response.data);

      setData(response.data);
    } catch (error) {
      console.error("요청 오류:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Image source={LoadingCat} />
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
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <SettingSection nickname={data.nickname} />
        <ProfileSection nickname={data.nickname} />
        <TabSection data={data} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    width: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.BLUE_400,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MyPageScreen;
