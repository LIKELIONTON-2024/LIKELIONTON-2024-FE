import {
  Alert,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Cat from '../assets/images/defaultCat.png';
import { COLOR } from '../styles/color';
import { Button } from '../components/common/button';
import { useState } from 'react';
import AgreeModal from '../components/Account/AgreeModal';
import useLocation from '../hooks/useLocation';
import place from '../assets/icons/placeIcon.png';
import camera from '../assets/icons/cameraIcon.png';
import notification from '../assets/icons/notificationIcon.png';

const PermissionContent = ({ onPress, image, title, contents }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
    >
      <Image source={image} style={{ width: 30, height: 30 }} />
      <View style={{ gap: 4 }}>
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
    </TouchableOpacity>
  );
};

export default ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { location, errorMsg, getLocation } = useLocation();

  const onPressNextButton = () => {
    setIsVisible(true);
  };

  const onPressLocationButton = async () => {
    await getLocation();
    if (errorMsg) {
      Alert.alert('Error', errorMsg);
    } else {
      Alert.alert(
        'Location',
        `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`
      );
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
        />
        <PermissionContent
          image={camera}
          title={'카메라'}
          contents={'인증 사진을 찍기 위해 필요해요.'}
        />
        <PermissionContent
          image={notification}
          title={'알림'}
          contents={'하루에 한 번씩 외출 알림을 위해 필요해요.'}
        />
      </View>
      <View style={{ paddingHorizontal: 34, paddingVertical: 10 }}>
        <Button
          onPress={onPressNextButton}
          text={'다음'}
          bgColor={COLOR.BLUE_400}
          color={COLOR.WHITE}
        />
      </View>
    </SafeAreaView>
  );
};
