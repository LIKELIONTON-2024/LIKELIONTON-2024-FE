import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import BasicHeader from "../components/MyPage/BasicHeader";
import SettingProfile from "../components/MyPage/SettingProfile";
import DetailArrow from "../components/MyPage/DetailArrow";
import { COLOR } from "../styles/color";

const Setting = ({ route, navigation }) => {
  // Extract nickname from route params
  const { nickname } = route.params || {};

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.background}>
        <BasicHeader title={"설정"} toScreen={"MyPage"} />
        <SettingProfile nickname={nickname} />
        <View style={styles.gap}>
          <DetailArrow title={"이용 약관"} toScreen={"MyPage"} />
          <DetailArrow title={"개인 정보 처리 방침"} toScreen={"MyPage"} />
        </View>
        <View style={styles.gap}>
          <DetailArrow title={"알림 설정"} toScreen={"MyPage"} />
          <DetailArrow title={"위치 권한 설정"} toScreen={"MyPage"} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  background: {
    backgroundColor: COLOR.GRAY_100,
  },
  gap: {
    marginTop: 20,
  },
});

export default Setting;
