import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Cat from '../assets/images/defaultCat.png';
import {COLOR} from '../styles/color';
import {Button} from '../components/common/button';
import {Margin} from '../components/common/Margin';
import backButton from '../assets/icons/backButtonIcon.png';
import search from '../assets/icons/searchIcon.png';

export default ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLOR.WHITE}}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{paddingHorizontal: 14}}>
          <Image source={backButton} style={{width: 29, height: 29}} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <View style={{paddingHorizontal: 34, paddingTop: 66, gap: 14}}>
          <Text style={{fontWeight: 'bold', fontSize: 30}}>프로필 설정</Text>
          <Text style={{color: COLOR.GRAY_200}}>
            프로필은 나중에도 설정할 수 있어요.
          </Text>
          <Margin height={50} />
          <Image
            source={Cat}
            style={{width: 126, height: 126, alignSelf: 'center'}}
          />
        </View>
        <Margin height={13} />
        <View style={{gap: 11, paddingHorizontal: 34}}>
          <Text style={{fontWeight: 'semibold', fontSize: 17}}>닉네임</Text>
          <TextInput
            style={{
              width: 325,
              height: 47,
              backgroundColor: COLOR.WHITE,
              borderWidth: 0.5,
              borderColor: COLOR.GRAY_200,
              borderRadius: 12,
            }}
          />
          <Text style={{color: COLOR.GRAY_200}}>
            8자리 이내, 문자/숫자 가능, 특수문자 입력불가
          </Text>

          <Text style={{fontWeight: 'semibold', fontSize: 17}}>집 주소</Text>
          <View>
            <TextInput
              style={{
                width: 325,
                height: 47,
                backgroundColor: COLOR.WHITE,
                borderWidth: 0.5,
                borderColor: COLOR.GRAY_200,
                borderRadius: 12,
                position: 'relative',
              }}
            />
            <Image
              source={search}
              style={{
                width: 24,
                height: 24,
                position: 'absolute',
                right: 10,
                top: 10,
              }}
            />
          </View>
          <Text style={{color: COLOR.GRAY_200}}>
            장소 인증을 위해 필요해요.
          </Text>
        </View>
      </View>
      <View style={{paddingHorizontal: 34, paddingVertical: 10}}>
        <Button
          onPress={() => navigation.navigate('SplashLogin')}
          text={'다음'}
          bgColor={COLOR.BLUE_400}
          color={COLOR.WHITE}
        />
      </View>
    </SafeAreaView>
  );
};
