import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import Camera from "./Camera";
import { COLOR } from "../../styles/color";

const CancelButton = require("../../assets/icons/cancleIcon.png");

const CertificationModal = ({ visible, onClose, spot, onVerify }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);

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
            <Image source={CancelButton} style={styles.cancelIcon} />
          </TouchableOpacity>
          {spot && (
            <View style={styles.modalBody}>
              <View style={styles.cameraContainer}>
                <Camera />
              </View>
              {photo && (
                <Image source={{ uri: photo }} style={styles.previewImage} />
              )}
              <Text style={styles.modalTitle}>{spot.name}</Text>

              <TouchableOpacity
                style={styles.verifyButton}
                onPress={() => {
                  if (onVerify) {
                    onVerify();
                  }
                }}
              >
                <Text style={styles.verifyText}> 인증하기 </Text>
              </TouchableOpacity>
            </View>
          )}
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
    width: 325,
    height: 545,
    backgroundColor: COLOR.WHITE,
    borderRadius: 30,
    position: "relative",
    marginBottom: 98,
  },
  closeButton: {
    position: "absolute",
    top: 13,
    right: 13,
  },
  cancelIcon: {
    width: 34,
    height: 34,
  },
  modalBody: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 58,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 23,
  },
  cameraContainer: {
    width: 255,
    height: 346,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 23,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  cameraButtonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
    justifyContent: "center",
  },
  cameraButton: {
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: COLOR.WHITE,
    padding: 10,
    borderRadius: 5,
  },
  cameraButtonText: {
    fontSize: 14,
    color: COLOR.BLACK,
  },
  previewImage: {
    width: "100%",
    height: 200,
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
});

export default CertificationModal;
