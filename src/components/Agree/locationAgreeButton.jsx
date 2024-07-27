import React, { useState } from 'react';
import { Button, View, Text, Alert } from 'react-native';
import * as Location from 'expo-location';

const LocationAgreeButton = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getLocation = async () => {
    // 권한 요청
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      Alert.alert(
        'Permission denied',
        'Permission to access location was denied'
      );
      return;
    }

    // 위치 데이터 가져오기
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Get Location" onPress={getLocation} />
      {location && (
        <Text>
          Location: {location.coords.latitude}, {location.coords.longitude}
        </Text>
      )}
      {errorMsg && <Text>{errorMsg}</Text>}
    </View>
  );
};

export default LocationAgreeButton;
