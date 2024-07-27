import React, { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLOR } from '../styles/color';
import { Button } from '../components/common/button';
import AgreeModal from '../components/Account/AgreeModal';
import useLocation from '../hooks/useLocation';
import place from '../assets/icons/placeIcon.png';
import camera from '../assets/icons/cameraIcon.png';
import notificationIcon from '../assets/icons/notificationIcon.png';
import useCamera from '../hooks/useCamera';
import useNotification from '../hooks/useNotification';
import checkOn from '../assets/icons/checkOn.png';
import checkOff from '../assets/icons/checkOff.png';

const PermissionContent = ({ onPress, image, title, contents, isAgree }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
    >
      <Image source={image} style={{ width: 30, height: 30 }} />
      <View style={{ gap: 4, flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{title}</Text>
          <Text
            style={{ fontSize: 13, fontWeight: 'regular', color: '#FB8A8A' }}
          >
            (필수)
          </Text>
        </View>
        <Text
          style={{
            fontSize: 13,
            fontWeight: 'regular',
            color: COLOR.GRAY_200,
          }}
        >
          {contents}
        </Text>
      </View>
      {isAgree ? (
        <Image source={checkOn} style={styles.checkIcon} />
      ) : (
        <Image source={checkOff} style={styles.checkIcon} />
      )}
    </TouchableOpacity>
  );
};

const Agree = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [locationAgree, setLocationAgree] = useState(false);
  const [cameraAgree, setCameraAgree] = useState(false);
  const [notificationAgree, setNotificationAgree] = useState(false);

  const { location, errorMsg: locationErrorMsg, getLocation } = useLocation();
  const { image, errorMsg: cameraErrorMsg, handlePermissions } = useCamera();
  const { registerForPushNotificationsAsync, errorMsg: notificationErrorMsg } =
    useNotification();

  const allPermissionsGranted =
    locationAgree && cameraAgree && notificationAgree;

  const onPressNextButton = () => {
    if (allPermissionsGranted) {
      setIsVisible(true);
    } else {
      Alert.alert('계속하려면 모든 권한을 허용해야합니다.');
    }
  };

  const onPressLocationButton = async () => {
    await getLocation();
    if (locationErrorMsg) {
      Alert.alert('Error', locationErrorMsg);
    } else if (location) {
      Alert.alert(
        '성공',
        `위도: ${location.coords.latitude}, 경도: ${location.coords.longitude}`
      );
      setLocationAgree(true);
    }
  };

  const onPressCameraButton = async () => {
    await handlePermissions();
    if (cameraErrorMsg) {
      Alert.alert('오류!', cameraErrorMsg);
    } else {
      setCameraAgree(true);
    }
  };

  const onPressNotificationButton = async () => {
    const token = await registerForPushNotificationsAsync();
    if (token) {
      Alert.alert('푸시 알림', '권한 허용!');
      setNotificationAgree(true);
    } else {
      Alert.alert('오류!', notificationErrorMsg);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.WHITE }}>
      <AgreeModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        navigation={navigation}
      />
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 34, paddingTop: 66, gap: 14 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 30 }}>약관 동의</Text>
          <View style={{ gap: 2 }}>
            <Text style={{ color: COLOR.GRAY_200, fontSize: 17 }}>
              힉힉호무리를 사용하기 위해서는
            </Text>
            <Text style={{ color: COLOR.GRAY_200, fontSize: 17 }}>
              다음 권한이 필요해요.
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 34, gap: 37 }}>
        <PermissionContent
          onPress={onPressLocationButton}
          image={place}
          title={'위치'}
          contents={'내 위치를 통해 주변 지역 정보를 찾기 위해 필요해요.'}
          isAgree={locationAgree}
        />
        <PermissionContent
          onPress={onPressCameraButton}
          image={camera}
          title={'카메라'}
          contents={'인증 사진을 찍기 위해 필요해요.'}
          isAgree={cameraAgree}
        />
        <PermissionContent
          onPress={onPressNotificationButton}
          image={notificationIcon}
          title={'알림'}
          contents={'하루에 한 번씩 외출 알림을 위해 필요해요.'}
          isAgree={notificationAgree}
        />
      </View>
      <View style={{ paddingHorizontal: 34, paddingVertical: 10 }}>
        <Button
          onPress={onPressNextButton}
          text={'다음'}
          bgColor={allPermissionsGranted ? COLOR.BLUE_400 : COLOR.GRAY_400}
          color={COLOR.WHITE}
          disabled={!allPermissionsGranted}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  checkIcon: {
    width: 19,
    height: 18,
  },
});

export default Agree;
