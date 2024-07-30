import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR } from '../styles/color';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({ navigation }) => {
  useEffect(() => {
    const checkAuth = async () => {
      // AsyncStorage에서 액세스 토큰 가져오기
      const accessToken = await AsyncStorage.getItem('accessToken');
      // 액세스 토큰이 존재하는지 여부에 따라 네비게이션
      setTimeout(() => {
        if (accessToken) {
          navigation.replace('MainTab'); // 액세스 토큰이 존재하면 MainTab으로 이동
        } else {
          navigation.replace('Login'); // 액세스 토큰이 없으면 Login으로 이동
        }
      }, 1000); // 1초 후에 네비게이션
    };

    checkAuth();
  }, [navigation]);

  return (
    <View style={styles.splashContainer}>
      <View style={{ gap: 8 }}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR.BLUE_400,
  },
});
