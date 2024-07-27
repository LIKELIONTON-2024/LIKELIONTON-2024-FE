import {
  Dimensions,
  Keyboard,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {COLOR} from '../../styles/color';
import {Button} from '../common/button';
import {Margin} from '../common/Margin';

const {width, height} = Dimensions.get('screen');

export default ({isVisible, setIsVisible, navigation}) => {
  const onPressNextButton = () => {
    setIsVisible(false);
    navigation.navigate('SignUp');
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
        hideModalContentWhileAnimating>
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
          }}>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>
            이용약관에 동의하시면
          </Text>
          <Text style={{fontSize: 24, fontWeight: 'bold'}}>
            힉힉호무리를 이용하실 수 있어요.
          </Text>
          <Margin height={19} />
          <TouchableOpacity
            style={{
              backgroundColor: COLOR.BLUE_400,
              height: 47,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
            }}>
            <Text
              style={{fontSize: 17, fontWeight: 'bold', color: COLOR.WHITE}}>
              모두 동의하기
            </Text>
          </TouchableOpacity>
          <Margin height={29} />
          <View style={{gap: 29}}>
            <Text style={{fontWeight: 'regular', fontSize: 17}}>
              서비스 이용약관 동의 (필수)
            </Text>
            <Text style={{fontWeight: 'regular', fontSize: 17}}>
              위치기반 서비스 이용약관 동의 (필수)
            </Text>
            <Text style={{fontWeight: 'regular', fontSize: 17}}>
              개인정보 처리 방침 동의 (필수)
            </Text>
            <Text style={{fontWeight: 'regular', fontSize: 17}}>
              선택적 정보알림 수신 동의 (필수)
            </Text>
          </View>
          <Margin height={95} />
          <Button
            onPress={onPressNextButton}
            text={'시작하기'}
            bgColor={COLOR.BLUE_400}
            color={COLOR.WHITE}
          />
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
};
