import React, { useCallback, useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import cancleIcon from '../../assets/icons/cancleIcon.png';
import cat from '../../assets/images/defaultCat.png';
import { COLOR } from '../../styles/color';
import { Margin } from '../common/Margin';
import { BaseURL } from '../../apis/api';

const FriendModal = ({ isVisible, setIsVisible, friendId }) => {
  const [friendProfile, setFriendProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [churSent, setChurSent] = useState(false); // 츄르 보낸 상태

  const onPressCancelButton = () => {
    setIsVisible(false);
  };

  const fetchFriendProfile = useCallback(async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        Alert.alert('로그인이 필요합니다.');
        setIsVisible(false);
        return;
      }

      const response = await axios.get(`${BaseURL}/user/profile/${friendId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      if (response.status === 200) {
        setFriendProfile(response.data);

        // 츄르 보낸 시간 확인
        const churSentTime = await AsyncStorage.getItem(
          `churSentTime_${friendId}`
        );
        if (churSentTime) {
          const lastSent = new Date(churSentTime);
          const now = new Date();
          if (now.toDateString() === lastSent.toDateString()) {
            setChurSent(true);
          }
        }
      } else {
        Alert.alert('프로필 정보를 가져오는 데 실패했습니다.');
      }
    } catch (error) {
      console.error('프로필 정보 가져오기 오류:', error);
      Alert.alert('프로필 정보를 가져오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, [friendId]);

  useEffect(() => {
    if (isVisible) {
      fetchFriendProfile();
    }
  }, [isVisible, fetchFriendProfile]);

  const sendChur = useCallback(async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.post(
        `${BaseURL}/chur/send?receiverId=${friendId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        Alert.alert('츄르를 성공적으로 보냈습니다.');
        setChurSent(true); // 츄르 보낸 상태 업데이트
        await AsyncStorage.setItem(
          `churSentTime_${friendId}`,
          new Date().toISOString()
        );
      } else {
        Alert.alert('츄르 보내기에 실패했습니다.');
      }
    } catch (error) {
      console.error('츄르 보내기 오류:', error);
      Alert.alert('이미 보내셨습니다.');
    }
  }, [friendId]);

  const deleteFriend = useCallback(async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const response = await axios.delete(`${BaseURL}/friend/delete`, {
        params: { friendId },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        Alert.alert('친구가 삭제되었습니다.');
        setIsVisible(false);
        // 필요한 후속 처리를 여기에 추가 (예: 친구 목록 업데이트)
      } else {
        Alert.alert('친구 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('친구 삭제 오류:', error);
      Alert.alert('친구 삭제 중 오류가 발생했습니다.');
    }
  }, [friendId]);

  if (loading) {
    return (
      <Modal isVisible={isVisible}>
        <View style={styles.modalContainer}>
          <Text>로딩 중...</Text>
        </View>
      </Modal>
    );
  }

  if (!friendProfile) {
    return (
      <Modal isVisible={isVisible}>
        <View style={styles.modalContainer}>
          <Text>프로필 정보를 불러올 수 없습니다.</Text>
          <TouchableOpacity onPress={onPressCancelButton}>
            <Text>닫기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }

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
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={onPressCancelButton}
            style={styles.closeButton}
          >
            <Image source={cancleIcon} style={styles.closeIcon} />
          </TouchableOpacity>
          <Margin height={18} />
          <Image
            source={{ uri: friendProfile.userImage }}
            style={styles.catImage}
          />
          <Margin height={7} />
          <Text style={styles.friendName}>{friendProfile.nickname}</Text>
          <Margin height={10} />
          <Text style={styles.lastLoginText}>
            마지막 접속 일시: {friendProfile.lastVerifiedDate.slice(0, 10)}
          </Text>
          <Margin height={21} />
          {churSent ? (
            <TouchableOpacity
              style={[styles.sendButton, styles.disabledButton]}
              disabled
            >
              <Text style={styles.ButtonText}>이미 보냈어요</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.sendButton} onPress={sendChur}>
              <Text style={styles.ButtonText}>츄르 보내기</Text>
            </TouchableOpacity>
          )}
          <Margin height={7} />
          <TouchableOpacity style={styles.deleteButton} onPress={deleteFriend}>
            <Text style={styles.ButtonText}>친구 삭제</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    width: 295,
    height: 436,
    borderRadius: 30,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeIcon: {
    width: 34,
    height: 34,
  },
  catImage: {
    width: 144,
    height: 144,
  },
  friendName: {
    fontWeight: 'bold',
    fontSize: 24,
  },
  lastLoginText: {
    fontWeight: 'regular',
    fontSize: 13,
    color: COLOR.GRAY_300,
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
  ButtonText: {
    fontWeight: 'medium',
    fontSize: 17,
    color: COLOR.WHITE,
  },
  disabledButton: {
    backgroundColor: COLOR.GRAY_300,
  },
});

export default FriendModal;
