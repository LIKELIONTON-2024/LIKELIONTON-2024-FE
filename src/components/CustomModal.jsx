import { Keyboard, SafeAreaView, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import React from 'react';

export default ({ isVisible, setIsVisible }) => {
  return (
    <SafeAreaView>
      <Modal
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
        hideModalContentWhileAnimating
      >
        <View style={{ width: 300, height: 300, backgroundColor: '#fff' }}>
          <Text>Modal</Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
