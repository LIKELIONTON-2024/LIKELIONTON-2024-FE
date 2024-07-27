import {
  Alert,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button } from '../components/common/button';
import axios from 'axios';
import kakaoIcon from '../assets/icons/kakaoIcon.png';
import googleIcon from '../assets/icons/googleIcon.png';
import naverIcon from '../assets/icons/naverIcon.png';
import { COLOR } from '../styles/color';

export default ({ navigation }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 데이터를 가져오는 함수
  const fetchData = async () => {
    try {
      const res = await axios.get(
        'http://ec2-43-203-224-22.ap-northeast-2.compute.amazonaws.com:8080/oauth2/google/login'
      );
      setData(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
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
        <Text
          style={{
            alignSelf: 'flex-start',
            color: COLOR.WHITE,
            fontWeight: 'bold',
          }}
        >
          나가서 바람이라도 쐐____________
        </Text>
        <Text style={{ fontWeight: 'bold', fontSize: 50 }}>힉힉호무리</Text>
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
          onPress={() => {}}
          icon={naverIcon}
          bgColor={COLOR.NAVERBUTTON}
          text={'네이버로 계속하기'}
        />
        <Button
          onPress={fetchData}
          icon={googleIcon}
          bgColor={COLOR.GRAY_100}
          text={'구글로 계속하기'}
        />
      </View>
    </SafeAreaView>
  );
};
