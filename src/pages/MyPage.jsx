import { SafeAreaView, StyleSheet, View } from "react-native";
import SettingSection from "../components/MyPage/SettingSection";
import ProfileSection from "../components/MyPage/ProfileSection";
import TabSection from "../components/MyPage/TabSection";
import { COLOR } from "../styles/color";

export default () => {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <SettingSection />
        <ProfileSection />
        <TabSection />
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
});
