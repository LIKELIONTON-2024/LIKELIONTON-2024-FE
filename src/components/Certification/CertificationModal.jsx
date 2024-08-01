import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { COLOR } from "../../styles/color";

const CancelButton = require("../../assets/icons/cancleIcon.png");

const CertificationModal = ({
  visible,
  onClose,
  spot,
  errorMessage,
  onVerify,
}) => (
  <Modal
    visible={visible}
    transparent={true}
    animationType="slide"
    onRequestClose={onClose}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Image source={CancelButton} style={styles.cancelIcon} />
        </TouchableOpacity>
        {spot && (
          <View style={styles.modalBody}>
            <Text style={styles.modalTitle}>{spot.name}</Text>
            {errorMessage && (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            )}
            <TouchableOpacity style={styles.verifyButton} onPress={onVerify}>
              <Text style={styles.verifyText}> 인증하기 </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  cancelIcon: {
    width: 24,
    height: 24,
  },
  modalBody: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  verifyButton: {
    width: 229,
    justifyContent: "center",
    alignItems: "center",
    height: 43,
    borderRadius: 12,
    backgroundColor: COLOR.BLUE_400,
  },
  verifyText: {
    fontSize: 17,
    color: COLOR.WHITE,
  },
  errorMessage: {
    color: "red",
    marginVertical: 10,
  },
});

export default CertificationModal;
