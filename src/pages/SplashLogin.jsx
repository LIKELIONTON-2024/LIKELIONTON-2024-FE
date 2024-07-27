import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLOR} from '../styles/color';

export default ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainTab');
    }, 1000);
  });

  return (
    <View style={styles.splashContainer}>
      <View style={{gap: 8}}>
        <Text
          style={{
            justifyContent: 'flex-start',
            color: COLOR.WHITE,
            fontWeight: 'bold',
          }}>
          나가서 바람이라도 쐐____________
        </Text>
        <Text style={{fontWeight: 'bold', fontSize: 24}}>회원가입이</Text>
        <Text style={{fontWeight: 'bold', fontSize: 24}}>완료되었습니다!</Text>
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
});
