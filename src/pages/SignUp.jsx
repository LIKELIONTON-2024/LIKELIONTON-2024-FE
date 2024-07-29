import React, { useCallback, useMemo, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import Cat from '../assets/images/defaultCat.png';
import { COLOR } from '../styles/color';
import { Margin } from '../components/common/Margin';
import backButton from '../assets/icons/backButtonIcon.png';
import search from '../assets/icons/searchIcon.png';
import { BaseURL } from '../apis/api';

const SignUp = ({ navigation }) => {
  const [nickname, setNickname] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [loading, setLoading] = useState(false);

  const nicknameErrorText = useMemo(() => {
    if (nickname.length === 0) {
      return '닉네임을 입력해주세요.';
    }
    if (nickname.length > 8) {
      return '닉네임은 8자리 이내여야 합니다.';
    }
    if (/[^a-zA-Z0-9]/.test(nickname)) {
      return '닉네임은 문자와 숫자만 가능합니다.';
    }
    return null;
  }, [nickname]);

  const zipCodeErrorText = useMemo(() => {
    if (zipCode.length === 0) {
      return '우편번호를 입력해주세요.';
    }
    if (!/^\d{5}$/.test(zipCode)) {
      return '유효한 우편번호를 입력해주세요.';
    }
    return null;
  }, [zipCode]);

  const onChangeNickname = useCallback((text) => {
    setNickname(text);
  }, []);

  const onChangeZipCode = useCallback((text) => {
    setZipCode(text);
  }, []);

  const postData = async () => {
    const url = `${BaseURL}/user/join`;
    const data = {
      email: 'test@gmail.com',
      nickname,
      zipCode: zipCode,
    };

    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('response____', response.data);
    } catch (error) {
      console.error('Error occurred while sending POST request:', error);
    }
  };

  const nextButtonEnabled = useMemo(() => {
    return nicknameErrorText == null && zipCodeErrorText == null;
  }, [nicknameErrorText, zipCodeErrorText]);

  const nextButtonStyle = useMemo(() => {
    if (nextButtonEnabled) {
      return styles.nextButton;
    }
    return [styles.nextButton, styles.disabledNextButton];
  }, [nextButtonEnabled]);

  const onPressNextButton = useCallback(async () => {
    setLoading(true);
    try {
      await postData();
      navigation.navigate('SplashLogin');
    } catch (error) {
      console.error('Error navigating to next screen:', error);
    } finally {
      setLoading(false);
    }
  }, [postData, navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.WHITE }}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ paddingHorizontal: 14 }}
        >
          <Image source={backButton} style={{ width: 29, height: 29 }} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 34, paddingTop: 66, gap: 14 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 30 }}>프로필 설정</Text>
          <Text style={{ color: COLOR.GRAY_200 }}>
            프로필은 나중에도 설정할 수 있어요.
          </Text>
          <Margin height={50} />
          <Image
            source={Cat}
            style={{ width: 126, height: 126, alignSelf: 'center' }}
          />
        </View>
        <Margin height={13} />
        <View style={{ gap: 11, paddingHorizontal: 34 }}>
          <Text style={{ fontWeight: 'semibold', fontSize: 17 }}>닉네임</Text>
          <TextInput
            value={nickname}
            onChangeText={onChangeNickname}
            autoCapitalize="none"
            style={{
              width: 325,
              height: 47,
              backgroundColor: COLOR.WHITE,
              borderWidth: 0.5,
              borderColor: COLOR.GRAY_200,
              borderRadius: 12,
              padding: 10,
            }}
          />
          <Text style={{ color: COLOR.GRAY_200 }}>
            8자리 이내, 문자/숫자 가능, 특수문자 입력불가
          </Text>
          {nicknameErrorText && (
            <Text style={styles.errorText}>{nicknameErrorText}</Text>
          )}
          <Text style={{ fontWeight: 'semibold', fontSize: 17 }}>우편번호</Text>
          <View>
            <TextInput
              value={zipCode}
              onChangeText={onChangeZipCode}
              style={{
                width: 325,
                height: 47,
                backgroundColor: COLOR.WHITE,
                borderWidth: 0.5,
                borderColor: COLOR.GRAY_200,
                borderRadius: 12,
                padding: 10,
              }}
            />
            <TouchableOpacity
              style={{ position: 'absolute', right: 10, top: 10 }}
            >
              <Image
                source={search}
                style={{
                  width: 24,
                  height: 24,
                }}
              />
            </TouchableOpacity>
          </View>
          <Text style={{ color: COLOR.GRAY_200 }}>
            장소 인증을 위해 필요해요.
          </Text>
          {zipCodeErrorText && (
            <Text style={styles.errorText}>{zipCodeErrorText}</Text>
          )}
        </View>
      </View>
      <View style={{ paddingHorizontal: 34, paddingVertical: 10 }}>
        <TouchableOpacity
          onPress={onPressNextButton}
          disabled={!nextButtonEnabled || loading}
          style={nextButtonStyle}
        >
          <Text style={styles.nextButtonText}>다음</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  nextButton: {
    width: 325,
    height: 51,
    backgroundColor: COLOR.BLUE_400,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextButtonText: {
    color: COLOR.WHITE,
  },
  disabledNextButton: {
    backgroundColor: COLOR.BLACK,
  },
  errorText: {
    color: 'red',
  },
});

export default SignUp;
