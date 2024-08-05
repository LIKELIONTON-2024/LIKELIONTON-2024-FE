import React from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { COLOR } from "../../styles/color";
import useFetchUserImages from "../../hooks/useFetchUserImages";

const ProfileSection = React.memo(({ nickname }) => {
  const { data, loading, error } = useFetchUserImages();

  if (loading) {
    return (
      <View style={styles.profileImgContainer}>
        <ActivityIndicator size="large" color={COLOR.BLACK} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.profileImgContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.profileImgContainer}>
      <Image source={{ uri: data?.inventoryImage }} style={styles.profileImg} />
      <Text style={styles.userName}>{nickname}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  profileImgContainer: {
    marginTop: 54,
    alignItems: "center",
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
