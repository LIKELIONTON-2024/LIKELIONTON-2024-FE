import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BasicHeader from "../components/MyPage/BasicHeader";
import SnackCount from "../components/MyPage/SnackCount";
import ShopBottomSheet from "../components/MyPage/shopBottomSheet";
import { COLOR } from "../styles/color";
import { BaseURL } from "../apis/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const imageAssets = {
  cat: {
    default: require("../assets/images/fur1.png"),
    black: require("../assets/images/fur2.png"),
    gray: require("../assets/images/fur3.png"),
    white: require("../assets/images/fur4.png"),
  },
  background: {
    default: require("../assets/images/background1.png"),
    green: require("../assets/images/background2.png"),
  },
};

const Shop = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [totalChuru, setTotalChuru] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleImageSelect = useCallback((image) => {
    console.log("Selected Image:", image);
    setSelectedImage(image);
  }, []);

  const handleBackgroundSelect = useCallback((image) => {
    console.log("Selected Background Image:", image);
    setBackgroundImage(image);
  }, []);

  const saveSelection = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("로그인 정보가 없습니다.");
      }

      console.log("Saving Selection:", {
        type: "cat",
        name: selectedImage?.name || "default",
      });
      console.log("Saving Selection Background:", {
        type: "background",
        name: backgroundImage?.name || "default",
      });

      const response = await axios.put(
        `${BaseURL}/inventory/select`,
        [
          { type: "cat", name: selectedImage?.name || "default" },
          { type: "background", name: backgroundImage?.name || "default" },
        ],
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Selection saved:", response.data);
    } catch (error) {
      console.error("Failed to save selection:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("로그인 정보가 없습니다.");
        }

        console.log("Fetching user inventory...");

        const response = await axios.get(`${BaseURL}/user/inventory`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log("API 응답 (inventory):", response.data);

        setTotalChuru(response.data.totalChuru);
        setInventory(response.data.inventory);

        const selectedCat = response.data.inventory.find(
          (item) => item.type === "cat" && item.isSelected
        );

        const selectedBackground = response.data.inventory.find(
          (item) => item.type === "background" && item.isSelected
        );

        setSelectedImage(selectedCat);
        setBackgroundImage(selectedBackground);
      } catch (error) {
        setError(error.message);
        console.error("요청 오류:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={COLOR.BLACK} />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.loader}>
          <Text>Error: {error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.header}>
          <BasicHeader toScreen="MyPage" onBackPress={saveSelection} />
          <SnackCount totalChuru={totalChuru} />
        </View>
        <View style={styles.container}>
          {backgroundImage && (
            <Image
              source={
                imageAssets[backgroundImage.type][backgroundImage.name] ||
                imageAssets[backgroundImage.type].default
              }
              style={styles.backgroundImage}
              resizeMode="cover"
            />
          )}
          {selectedImage && (
            <Image
              source={
                imageAssets[selectedImage.type][selectedImage.name] ||
                imageAssets[selectedImage.type].default
              }
              style={styles.catImage}
              resizeMode="contain"
            />
          )}
        </View>
        <ShopBottomSheet
          onImageSelect={handleImageSelect}
          onBackgroundSelect={handleBackgroundSelect}
          inventory={inventory}
        />
        <View style={styles.homeIndicatorBackground} />
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
    backgroundColor: "transparent",
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
    position: "absolute",
    top: 100,
    zIndex: 1,
  },
  backgroundImage: {
    width: 392,
    height: 698,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Shop;
