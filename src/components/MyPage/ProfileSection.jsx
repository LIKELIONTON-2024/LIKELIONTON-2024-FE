import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { COLOR } from "../../styles/color";

const ProfileImg = require("../../assets/images/defaultCat.png");

const ProfileSection = () => (
  <View style={styles.profileImgContainer}>
    <Image source={ProfileImg} style={styles.profileImg} />
    <Text style={styles.userName}>독수리오형제</Text>
  </View>
);

const styles = StyleSheet.create({
  profileImgContainer: {
    marginTop: 54,
  },
  profileImg: {
    width: 191,
    height: 190,
  },
  userName: {
    textAlign: "center",
    marginTop: 21,
    fontSize: 24,
    color: COLOR.GRAY_400,
    fontWeight: "bold",
    marginBottom: 12,
  },
});

export default ProfileSection;
