import React, { useRef, useState, useCallback } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { COLOR } from "../../styles/color";
import PhotoGrid from "./PhotoGrid";
import CustomModal from "./CustomModal";
import BottomSheetHeader from "./BottomSheetHeader";

const { width } = Dimensions.get("window");

const imagesByTab = {
  털: [
    require("../../assets/images/fur1On.png"),
    require("../../assets/images/fur2Off.png"),
    require("../../assets/images/fur3Off.png"),
    require("../../assets/images/fur4Off.png"),
  ],
  배경: [
    require("../../assets/images/background1On.png"),
    require("../../assets/images/background2Off.png"),
  ],
  악세사리: [
    require("../../assets/images/defaultCat.png"),
    require("../../assets/images/defaultCat.png"),
    require("../../assets/images/defaultCat.png"),
    require("../../assets/images/defaultCat.png"),
  ],
};

const unlockedImages = {
  [require("../../assets/images/fur2Off.png")]: require("../../assets/images/fur2On.png"),
  [require("../../assets/images/fur3Off.png")]: require("../../assets/images/fur3On.png"),
  [require("../../assets/images/fur4Off.png")]: require("../../assets/images/fur4On.png"),
  [require("../../assets/images/background2Off.png")]: require("../../assets/images/background2On.png"),
};

const ShopBottomSheet = () => {
  const [activeTab, setActiveTab] = useState("털");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const bottomSheetRef = useRef(null);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleImagePress = (image) => {
    console.log("Image Source:", image);

    if (isImageLocked(image)) {
      setSelectedImage(getUnlockedImage(image));
      setIsModalVisible(true);
    }
  };

  const isImageLocked = (image) => {
    return Object.keys(unlockedImages).includes(image.toString());
  };

  const getUnlockedImage = (lockedImage) => {
    return unlockedImages[lockedImage] || lockedImage;
  };

  const getImageStyle = () => {
    if (activeTab === "배경") {
      return styles.backgroundImage;
    }
    return styles.defaultImage;
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
          <PhotoGrid
            images={imagesByTab[activeTab] || []}
            onImagePress={handleImagePress}
            getImageStyle={getImageStyle}
          />
        </View>
      </BottomSheet>

      {selectedImage && (
        <CustomModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          image={selectedImage}
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
    marginHorizontal: 52,
  },
  defaultImage: {
    width: 140,
    height: 140,
    resizeMode: "cover",
  },
  backgroundImage: {
    width: 152,
    height: 270,
    resizeMode: "cover",
  },
});

export default ShopBottomSheet;
