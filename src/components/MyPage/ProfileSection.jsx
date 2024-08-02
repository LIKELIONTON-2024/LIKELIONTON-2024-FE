import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { COLOR } from "../../styles/color";

const mockData = {
  inventoryImage:
    "https://likelion-hikikomori.s3.ap-northeast-2.amazonaws.com/inventory-default.png",
  inventoryBackgroundImage:
    "https://likelion-hikikomori.s3.ap-northeast-2.amazonaws.com/default.png",
};

const ProfileSection = ({ nickname }) => (
  <View style={styles.profileImgContainer}>
    <Image
      source={{ uri: mockData.inventoryImage }}
      style={styles.profileImg}
    />
    <Text style={styles.userName}>{nickname}</Text>
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
