import { useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const useCamera = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [image, setImage] = useState(null);

  const requestCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access camera was denied');
      Alert.alert(
        'Permission denied',
        'Permission to access camera was denied'
      );
      return false;
    }
    return true;
  };

  const requestMediaLibraryPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access media library was denied');
      Alert.alert(
        'Permission denied',
        'Permission to access media library was denied'
      );
      return false;
    }
    return true;
  };

  const handlePermissions = async () => {
    const cameraGranted = await requestCameraPermissions();
    const mediaLibraryGranted = await requestMediaLibraryPermissions();

    if (cameraGranted && mediaLibraryGranted) {
      Alert.alert(
        'Permissions granted',
        'You have access to camera and media library'
      );
    }
  };

  return { image, errorMsg, handlePermissions, setImage };
};

export default useCamera;
