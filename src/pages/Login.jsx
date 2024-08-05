// todo : 구글 로그인
import { Image, Linking, SafeAreaView, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button } from '../components/common/button';
import axios from 'axios';
import kakaoIcon from '../assets/icons/kakaoIcon.png';
import googleIcon from '../assets/icons/googleIcon.png';
import naverIcon from '../assets/icons/naverIcon.png';
import { COLOR } from '../styles/color';
import { BaseURL } from '../apis/api';
import logoImage from '../assets/images/logo.png';

export default ({ navigation }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 데이터를 가져오는 함수
  const fetchData = async () => {
    try {
      const uri = await axios.get(`${BaseURL}/oauth2/google/login`);
      setData(uri.data);
      // navigation.navigate('Agree');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    fetchData();
  };

  const openAuthUri = () => {
    if (data) {
      Linking.openURL(data);
    } else {
      console.log('no URL open');
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLOR.BLUE_400,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          flex: 1,
          gap: 8,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Image source={logoImage} style={{ width: 270, height: 218 }} />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <Button
          onPress={() => navigation.navigate('Agree')}
          icon={kakaoIcon}
          bgColor={COLOR.KAKAOBUTTON}
          text={'카카오로 계속하기'}
        />
        <Button
          onPress={() => navigation.navigate('MainTab')}
          icon={naverIcon}
          bgColor={COLOR.NAVERBUTTON}
          text={'네이버로 계속하기'}
        />
        <Button
          // onPress={openAuthUri}
          onPress={() => navigation.navigate('Agree')}
          icon={googleIcon}
          bgColor={COLOR.GRAY_100}
          text={'구글로 계속하기'}
        />
      </View>
    </SafeAreaView>
  );
};
