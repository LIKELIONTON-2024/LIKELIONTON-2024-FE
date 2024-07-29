import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// import ShopBottomSheet from "../shopScreen/shopBottomSheet";
import BasicHeader from "../components/MyPage/BasicHeader";
import { COLOR } from "../styles/color";

const Cat = require("../assets/images/defaultCat.png");

const ShopScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("눈");

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeAreaView}>
        <BasicHeader toScreen={"MyPage"} />
        <View style={styles.container}>
          <Image source={Cat} style={styles.catImage} />
          <Text style={styles.text}>상점.</Text>
        </View>
        {/* <ShopBottomSheet
          snapPoints={[104, 442]}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        /> */}
      </SafeAreaView>
    </GestureHandlerRootView>
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
  },
  catImage: {
    width: 301,
    height: 299,
    marginTop: 104,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default ShopScreen;
