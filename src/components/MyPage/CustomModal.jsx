import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  Dimensions,
} from "react-native";
import { COLOR } from "../../styles/color";

const { width } = Dimensions.get("window");

const CustomModal = ({ visible, onClose, image }) => (
  <Modal transparent={true} visible={visible} onRequestClose={onClose}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.modalCancelButton} onPress={onClose}>
          <Image
            source={require("../../assets/icons/cancleIcon.png")}
            style={styles.modalCancelIcon}
          />
        </TouchableOpacity>
        <Image source={image} style={styles.modalImage} />
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>구매하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    width: width - 40,
    padding: 20,
    backgroundColor: COLOR.WHITE,
    borderRadius: 10,
    alignItems: "center",
    position: "relative",
  },
  modalImage: {
    width: "100%",
    height: 182,
    resizeMode: "contain",
  },
  modalCancelButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
    zIndex: 10,
  },
  modalCancelIcon: {
    width: 24,
    height: 24,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: COLOR.BLUE_400,
    borderRadius: 5,
  },
  closeButtonText: {
    color: COLOR.WHITE,
    fontSize: 16,
  },
});

export default CustomModal;
