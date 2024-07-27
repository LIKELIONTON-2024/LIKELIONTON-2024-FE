import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);

  useEffect(() => {
    const requestPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);
      if (status !== 'granted') {
        setErrorMsg('위치에 대한 액세스 권한이 거부되었습니다.');
        Alert.alert('거부', '위치에 대한 액세스 권한이 거부되었습니다.');
      }
    };

    requestPermission();
  }, []);

  const getLocation = async () => {
    if (permissionStatus === 'granted') {
      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        setErrorMsg(
          '위치를 가져오는 중에 오류가 발생했습니다.',
          '인터넷 통신이 원할하지 않습니다.'
        );
        console.error('위치를 가져오는 중에 오류가 발생했습니다:', error);
      }
    }
  };

  return { location, errorMsg, getLocation };
};

export default useLocation;
