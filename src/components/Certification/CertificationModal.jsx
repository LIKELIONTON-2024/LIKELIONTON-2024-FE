import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Camera } from "expo-camera";

import { COLOR } from "../../styles/color";

const CancelButton = require("../../assets/icons/cancleIcon.png");

const CertificationModal = ({
  visible,
  onClose,
  spot,
  errorMessage,
  onVerify,
}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setPhoto(photo.uri);
    }
  };

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
                {hasPermission === null ? (
                  <Text>Requesting for camera permission</Text>
                ) : hasPermission === false ? (
                  <Text>No access to camera</Text>
                ) : (
                  <Camera
                    style={styles.camera}
                    type={Camera.Constants.Type.back}
                    ref={(ref) => setCameraRef(ref)}
                  >
                    {/* <View style={styles.cameraButtonContainer}>
                      <TouchableOpacity
                        style={styles.cameraButton}
                        onPress={takePicture}
                      >
                        <Text style={styles.cameraButtonText}> 촬영 </Text>
                      </TouchableOpacity>
                    </View> */}
                  </Camera>
                )}
              </View>
              {photo && (
                <Image source={{ uri: photo }} style={styles.previewImage} />
              )}
              <Text style={styles.modalTitle}>{spot.name}</Text>
              {errorMessage && (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              )}
              <TouchableOpacity
                style={styles.verifyButton}
                onPress={() => {
                  if (onVerify) {
                    onVerify();
                    takePicture();
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
    padding: 20,
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
    marginTop: 10,
  },
  modalTitle: {
    fontSize: 18,
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
  errorMessage: {
    color: "red",
    marginVertical: 10,
  },
});

export default CertificationModal;
