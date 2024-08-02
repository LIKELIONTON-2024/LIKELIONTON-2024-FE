import React, { useRef, useState, useCallback } from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { COLOR } from "../../styles/color";
import PhotoGrid from "./PhotoGrid";
import CustomModal from "./CustomModal";
import BottomSheetHeader from "./BottomSheetHeader";

const { width } = Dimensions.get("window");

const imageList = {
  털: [
    {
      name: "fur1.png",
      uri: require("../../assets/images/fur1.png"),
      koreanName: "갈색냥이",
    },
    {
      name: "fur2.png",
      uri: require("../../assets/images/fur2.png"),
      koreanName: "검정냥이",
    },
    {
      name: "fur3.png",
      uri: require("../../assets/images/fur3.png"),
      koreanName: "회색냥이",
    },
    {
      name: "fur4.png",
      uri: require("../../assets/images/fur4.png"),
      koreanName: "흰색냥이",
    },
  ],
  배경: [
    {
      name: "background1.png",
      uri: require("../../assets/images/background1.png"),
      koreanName: "하얀",
    },
    {
      name: "background2.png",
      uri: require("../../assets/images/background2.png"),
      koreanName: "풀밭",
    },
  ],
};

const ShopBottomSheet = ({ onImageSelect, onBackgroundSelect }) => {
  const [activeTab, setActiveTab] = useState("털");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [lockedImages, setLockedImages] = useState({
    "fur1.png": false,
    "fur2.png": true,
    "fur3.png": true,
    "fur4.png": true,
    "background1.png": false,
    "background2.png": true,
  });
  const bottomSheetRef = useRef(null);

  const handleSheetChanges = useCallback((index) => {
    console.log("BottomSheet index:", index);
  }, []);

  const handleImagePress = (image) => {
    if (lockedImages[image.name]) {
      setSelectedImage(image);
      setIsModalVisible(true);
    } else {
      if (activeTab === "배경") {
        onBackgroundSelect(image.uri);
      } else {
        onImageSelect(image.uri);
      }
    }
  };

  const handlePurchase = () => {
    if (selectedImage) {
      setLockedImages((prevLockedImages) => ({
        ...prevLockedImages,
        [selectedImage.name]: false,
      }));
      setIsModalVisible(false);
      setSelectedImage(null);
    }
  };

  const getImageStyle = () => {
    return activeTab === "배경" ? styles.backgroundImage : styles.defaultImage;
  };

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
              images={imageList[activeTab] || []}
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
          onClose={() => setIsModalVisible(false)}
          onPurchase={handlePurchase}
          image={selectedImage.uri}
          koreanName={selectedImage.koreanName}
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
