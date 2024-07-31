import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { COLOR } from '../../styles/color';
import { Button } from '../common/button';
import { Margin } from '../common/Margin';
import checkOn from '../../assets/icons/checkOn.png';
import checkOff from '../../assets/icons/checkOff.png';
import { useState } from 'react';

const { width, height } = Dimensions.get('screen');

const CheckAgreeButton = ({ text, onPress, isAgree }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flexDirection: 'row', alignItems: 'center' }}
    >
      <Text style={{ fontWeight: 'regular', fontSize: 17, flex: 1 }}>
        {text}
      </Text>
      <Image
        source={isAgree ? checkOn : checkOff}
        style={{ width: 19, height: 18 }}
      />
    </TouchableOpacity>
  );
};

export default ({ isVisible, setIsVisible, navigation }) => {
  const [serviceAgree, setServiceAgree] = useState(false);
  const [locationAgree, setLocationAgree] = useState(false);
  const [privacyAgree, setPrivacyAgree] = useState(false);
  const [notificationAgree, setNotificationAgree] = useState(false);

  const allAgree =
    serviceAgree && locationAgree && privacyAgree && notificationAgree;

  const onPressNextButton = () => {
    if (allAgree) {
      setIsVisible(false);
      navigation.navigate('SignUp');
    } else {
      Alert.alert('모든 약관에 동의해야 시작할 수 있습니다.');
    }
  };

  const onPressAllAgreeButton = () => {
    setServiceAgree(true);
    setLocationAgree(true);
    setPrivacyAgree(true);
    setNotificationAgree(true);
  };

  return (
    <SafeAreaView>
      <ReactNativeModal
        useNativeDriver
        isVisible={isVisible}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        animationInTiming={300}
        backdropColor="#000"
        backdropOpacity={0.4}
        onBackdropPress={() => {
          Keyboard.dismiss();
          setIsVisible(!isVisible);
        }}
        onBackButtonPress={() => {
          Keyboard.dismiss();
          setIsVisible(!isVisible);
        }}
        style={{
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
        hideModalContentWhileAnimating
      >
        <View
          style={{
            backgroundColor: COLOR.WHITE,
            width,
            height: 534,
            paddingHorizontal: 34,
            paddingTop: 30,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            bottom: -30,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
            이용약관에 동의하시면
          </Text>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
            힉힉호무리를 이용하실 수 있어요.
          </Text>
          <Margin height={19} />
          <TouchableOpacity
            onPress={onPressAllAgreeButton}
            style={{
              backgroundColor: COLOR.BLUE_400,
              height: 47,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
            }}
          >
            <Text
              style={{ fontSize: 17, fontWeight: 'bold', color: COLOR.WHITE }}
            >
              모두 동의하기
            </Text>
          </TouchableOpacity>
          <Margin height={29} />
          <View style={{ gap: 29 }}>
            <CheckAgreeButton
              text={'서비스 이용약관 동의 (필수)'}
              onPress={() => setServiceAgree(!serviceAgree)}
              isAgree={serviceAgree}
            />
            <CheckAgreeButton
              text={'위치기반 서비스 이용약관 동의 (필수)'}
              onPress={() => setLocationAgree(!locationAgree)}
              isAgree={locationAgree}
            />
            <CheckAgreeButton
              text={'개인정보 처리 방침 동의 (필수)'}
              onPress={() => setPrivacyAgree(!privacyAgree)}
              isAgree={privacyAgree}
            />
            <CheckAgreeButton
              text={'선택적 정보알림 수신 동의 (필수)'}
              onPress={() => setNotificationAgree(!notificationAgree)}
              isAgree={notificationAgree}
            />
          </View>
          <Margin height={95} />
          <Button
            onPress={onPressNextButton}
            text={'시작하기'}
            bgColor={allAgree ? COLOR.BLUE_400 : COLOR.GRAY_400}
            color={COLOR.WHITE}
            disabled={!allAgree}
          />
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
};
