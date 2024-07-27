import { useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const useCamera = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [image, setImage] = useState(null);

  const requestCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('카메라 접근 권한이 거부되었습니다.');
      Alert.alert(
        '허가가 거부되었습니다.',
        '카메라 접근 권한이 거부되었습니다.'
      );
      return false;
    }
    return true;
  };

  const requestMediaLibraryPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('미디어 라이브러리에 대한 액세스 권한이 거부되었습니다.');
      Alert.alert(
        '허가가 거부되었습니다.',
        '미디어 라이브러리에 대한 액세스 권한이 거부되었습니다.'
      );
      return false;
    }
    return true;
  };

  const handlePermissions = async () => {
    const cameraGranted = await requestCameraPermissions();
    const mediaLibraryGranted = await requestMediaLibraryPermissions();

    if (cameraGranted && mediaLibraryGranted) {
      Alert.alert('성공', '카메라 및 앨범에 접근을 허용합니다.');
    }
  };

  return { image, errorMsg, handlePermissions, setImage };
};

export default useCamera;
