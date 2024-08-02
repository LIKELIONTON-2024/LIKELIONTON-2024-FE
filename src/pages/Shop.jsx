import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BasicHeader from "../components/MyPage/BasicHeader";
import SnackCount from "../components/MyPage/SnackCount";
import ShopBottomSheet from "../components/MyPage/shopBottomSheet";
import { COLOR } from "../styles/color";

const { width, height } = Dimensions.get("window");
const Cat = require("../assets/images/defaultCat.png");

const Shop = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(Cat);
  const [backgroundImage, setBackgroundImage] = useState(null);

  const handleImageSelect = useCallback((image) => {
    setSelectedImage(image);
  }, []);

  const handleBackgroundSelect = useCallback((image) => {
    setBackgroundImage(image);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.header}>
          <BasicHeader toScreen={"MyPage"} />
          <SnackCount />
        </View>
        <View style={styles.container}>
          {backgroundImage && (
            <Image source={backgroundImage} style={styles.backgroundImage} />
          )}
          <Image source={selectedImage} style={styles.catImage} />
        </View>
        <ShopBottomSheet
          onImageSelect={handleImageSelect}
          onBackgroundSelect={handleBackgroundSelect}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  catImage: {
    width: 301,
    height: 299,
    top: 100,
    position: "absolute",
    zIndex: 1,
  },
  backgroundImage: {
    width: 392,
    height: 698,
    position: "absolute",
    top: 0,
    left: 0,
    resizeMode: "cover",
    zIndex: 0,
  },
});

export default Shop;
