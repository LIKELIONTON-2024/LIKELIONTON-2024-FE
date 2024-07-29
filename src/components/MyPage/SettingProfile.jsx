import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { COLOR } from "../../styles/color";

const ProfileImg = require("../../assets/images/defaultCat.png");
const DetailArrow = require("../../assets/icons/detailArrow.png");

const SettingProfile = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.profileContainer}>
      <View style={styles.profileImgContainer}>
        <Image source={ProfileImg} style={styles.profileImg} />
      </View>
      <View style={styles.profileTextContainer}>
        <Text style={styles.userName}>독수리 오형제</Text>
        <Text style={styles.edit}>내 프로필 수정하기</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("MyPage")}>
        <Image source={DetailArrow} style={styles.detailArrow} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: COLOR.GRAY_100,
    borderWidth: 0.5,
    height: 89,
    paddingLeft: 25,
    paddingRight: 14,
    justifyContent: "space-between",
    backgroundColor: COLOR.WHITE,
  },
  profileImgContainer: {
    marginRight: 20,
  },
  profileImg: {
    width: 73,
    height: 73,
    borderRadius: 100,
  },
  profileTextContainer: {
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  edit: {
    fontSize: 17,
    fontWeight: "light",
  },
  detailArrow: {
    width: 24,
    height: 24,
  },
});

export default SettingProfile;
