import {
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import React from 'react';

import cancleIcon from '../../assets/icons/cancleIcon.png';
import cat from '../../assets/images/defaultCat.png';
import { COLOR } from '../../styles/color';
import { Margin } from '../common/Margin';

export default ({ isVisible, setIsVisible }) => {
  const onPressCancleButton = () => {
    setIsVisible(false);
  };
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
        style={{ alignSelf: 'center' }}
      >
        <View
          style={{
            width: 295,
            height: 436,
            borderRadius: 30,
            backgroundColor: '#fff',
            padding: 20,
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={onPressCancleButton}
            style={{ alignSelf: 'flex-end' }}
          >
            <Image source={cancleIcon} style={{ width: 34, height: 34 }} />
          </TouchableOpacity>
          <Margin height={18} />
          <View>
            <Image source={cat} style={{ width: 144, height: 144 }} />
          </View>
          <Margin height={7} />
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 24 }}>프론트엔드</Text>
          </View>
          <Margin height={10} />
          <View>
            <Text
              style={{
                fontWeight: 'regular',
                fontSize: 13,
                color: COLOR.GRAY_300,
              }}
            >
              마지막 접속 일시 2024.07.19
            </Text>
          </View>
          <Margin height={21} />
          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.ButtonText}>츄르 보내기</Text>
          </TouchableOpacity>
          <Margin height={7} />
          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.ButtonText}>친구 삭제</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ButtonText: {
    fontWeight: 'medium',
    fontSize: 17,
    color: COLOR.WHITE,
  },
  sendButton: {
    width: 229,
    height: 43,
    backgroundColor: COLOR.BLUE_400,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  deleteButton: {
    width: 229,
    height: 43,
    backgroundColor: COLOR.RED,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
});
