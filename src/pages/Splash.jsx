import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLOR } from '../styles/color';

export default ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 1000);
  });

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
