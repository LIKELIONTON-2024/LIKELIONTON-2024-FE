import React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SettingIcon = require("../../assets/icons/settingIcon.png");

const SettingSection = ({ nickname }) => {
  // Receive nickname as a prop
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.settingButton}
      onPress={() =>
        navigation.navigate("SettingStack", {
          screen: "Setting",
          params: { nickname },
        })
      } // Pass nickname
    >
      <Image source={SettingIcon} style={styles.settingIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  settingButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  settingIcon: {
    height: 29,
    width: 29,
  },
});

export default SettingSection;
