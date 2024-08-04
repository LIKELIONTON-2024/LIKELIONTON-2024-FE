import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { COLOR } from "../../styles/color";
import SaleSnack from "../../components/MyPage/SaleSnack.jsx";

const CustomModal = ({
  visible,
  onClose,
  onPurchase,
  image,
  koreanName,
  price,
  showInsufficientChuruMessage,
}) => {
  console.log("CustomModal Price:", price);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Image
              source={require("../../assets/icons/cancleIcon.png")}
              style={styles.cancelIcon}
            />
          </TouchableOpacity>
          <View style={styles.modalBody}>
            <Image source={image} style={styles.image} />
            <Text style={styles.modalTitle}>{koreanName}</Text>
            <SaleSnack snackCount={price} />
            {showInsufficientChuruMessage && (
              <Text style={styles.errorText}>츄르가 부족합니다.</Text>
            )}
            <TouchableOpacity
              style={styles.purchaseButton}
              onPress={onPurchase}
            >
              <Text style={styles.purchaseText}>구매하기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 295,
    height: 436,
    padding: 20,
    backgroundColor: COLOR.WHITE,
    borderRadius: 30,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  cancelIcon: {
    width: 34,
    height: 34,
  },
  modalBody: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  image: {
    width: 182,
    height: 182,
    marginBottom: 11,
    resizeMode: "contain",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  errorText: {
    color: COLOR.RED,
    marginBottom: 16,
  },
  purchaseButton: {
    width: 229,
    justifyContent: "center",
    alignItems: "center",
    height: 43,
    borderRadius: 12,
    backgroundColor: COLOR.BLUE_400,
  },
  purchaseText: {
    fontSize: 17,
    color: COLOR.WHITE,
  },
});

export default CustomModal;
