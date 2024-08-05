import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLOR } from '../styles/color';
import logo from '../assets/images/logo.png';

export default ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainTab');
    }, 1000);
  });

  return (
    <View style={styles.splashContainer}>
      <View style={{ alignItems: 'center', gap: 15 }}>
        <Image source={logo} style={{ width: 158, height: 130 }} />

        <Text style={styles.text}>회원가입이 완료되었습니다!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 41,
    backgroundColor: COLOR.BLUE_400,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 24,
  },
});
