import React, { useRef, useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import axios from "axios";
import { COLOR } from "../../styles/color";
import PhotoGrid from "./PhotoGrid";
import CustomModal from "./CustomModal";
import BottomSheetHeader from "./BottomSheetHeader";
import { BaseURL } from "../../apis/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const imageAssets = {
  cat: {
    default: require("../../assets/images/fur1.png"),
    black: require("../../assets/images/fur2.png"),
    gray: require("../../assets/images/fur3.png"),
    white: require("../../assets/images/fur4.png"),
  },
  background: {
    default: require("../../assets/images/background1.png"),
    green: require("../../assets/images/background2.png"),
  },
};

const ShopBottomSheet = ({ onImageSelect, onBackgroundSelect }) => {
  const [activeTab, setActiveTab] = useState("cat");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [lockedImages, setLockedImages] = useState({});
  const [churuCount, setChuruCount] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [showInsufficientChuruMessage, setShowInsufficientChuruMessage] =
    useState(false);
  const bottomSheetRef = useRef(null);

  const fetchInventoryData = async () => {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("No access token found.");
      }

      const response = await axios.get(`${BaseURL}/user/inventory`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("API Response:", response.data);

      const fetchedInventory = response.data.inventory || [];
      const churu = response.data.totalChuru || 0;

      const lockedImagesData = {};
      fetchedInventory.forEach((item) => {
        lockedImagesData[item.name] = item.isLocked;
      });

      setInventory(fetchedInventory);
      setLockedImages(lockedImagesData);
      setChuruCount(churu);
    } catch (error) {
      console.error(
        "Failed to fetch inventory data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log("BottomSheet index:", index);
  }, []);

  const handleImagePress = (image) => {
    const selectedImageData = inventory.find(
      (item) => item.name === image.name && item.type === activeTab
    );

    if (selectedImageData && selectedImageData.isLocked) {
      setSelectedImage({
        ...image,
        churu: selectedImageData.churu,
        koreanName: selectedImageData.koreanName,
        type: activeTab,
      });
      setIsModalVisible(true);
    } else {
      if (activeTab === "background") {
        onBackgroundSelect({
          type: activeTab,
          name: image.name,
        });
      } else {
        onImageSelect({
          type: activeTab,
          name: image.name,
        });
      }
    }
  };

  const handlePurchase = async () => {
    if (selectedImage) {
      if (churuCount >= selectedImage.churu) {
        try {
          const accessToken = await AsyncStorage.getItem("accessToken");
          if (!accessToken) {
            throw new Error("No access token found.");
          }

          const response = await axios.put(
            `${BaseURL}/inventory/buy?type=${selectedImage.type}&name=${selectedImage.name}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (response.status === 200) {
            setLockedImages((prevLockedImages) => ({
              ...prevLockedImages,
              [selectedImage.name]: false,
            }));
            setChuruCount(
              (prevChuruCount) => prevChuruCount - selectedImage.churu
            );
            setIsModalVisible(false);
            setSelectedImage(null);
            setShowInsufficientChuruMessage(false);
          } else {
            console.error("Failed to purchase item:", response.data);
          }
        } catch (error) {
          console.error(
            "Failed to purchase item:",
            error.response ? error.response.data : error.message
          );
        }
      } else {
        setShowInsufficientChuruMessage(true);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setShowInsufficientChuruMessage(false);
  };

  const getImageStyle = () => {
    return activeTab === "background"
      ? styles.backgroundImage
      : styles.defaultImage;
  };

  useEffect(() => {
    console.log("Selected Image:", selectedImage);
  }, [selectedImage]);

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[104, 520]}
        onChange={handleSheetChanges}
        handleComponent={() => (
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
            <BottomSheetHeader
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </View>
        )}
      >
        <View style={styles.content}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <PhotoGrid
              images={Object.keys(imageAssets[activeTab] || {}).map((key) => ({
                name: key,
                uri: imageAssets[activeTab][key],
                koreanName: key,
              }))}
              onImagePress={handleImagePress}
              getImageStyle={getImageStyle}
              lockedImages={lockedImages}
              type={activeTab}
            />
          </ScrollView>
        </View>
      </BottomSheet>

      {selectedImage && (
        <CustomModal
          visible={isModalVisible}
          onClose={handleCloseModal}
          onPurchase={handlePurchase}
          image={imageAssets[selectedImage.type][selectedImage.name]}
          koreanName={selectedImage.koreanName}
          price={selectedImage.churu}
          showInsufficientChuruMessage={showInsufficientChuruMessage}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  handleContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 0.5,
    borderTopColor: COLOR.GRAY_200,
  },
  handle: {
    width: 73,
    height: 5,
    backgroundColor: COLOR.GRAY_200,
    borderRadius: 100,
    marginTop: 8,
  },
  content: {
    flex: 1,
    marginHorizontal: 44,
  },
  scrollViewContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 4,
    marginRight: 4,
  },
  defaultImage: {
    width: 140,
    height: 140,
    resizeMode: "cover",
  },
  backgroundImage: {
    width: 148,
    height: 270,
    resizeMode: "cover",
  },
});

export default ShopBottomSheet;
