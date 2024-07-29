import React, { useState, useEffect, useCallback } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOR } from '../../styles/color';
import cat from '../../assets/images/defaultCat.png';
import { BaseURL } from '../../apis/api';

const { width } = Dimensions.get('screen');

const fetchFriendRequests = async (setFriendRequests, setError) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      setError('로그인 정보가 없습니다.');
      return;
    }

    const response = await axios.get(`${BaseURL}/friend-request/list`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    setFriendRequests(response.data);
  } catch (err) {
    setError('데이터를 가져오는 중 오류가 발생했습니다.');
  }
};

const handleResponse = async (requestId, action) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('로그인 정보가 없습니다.');
    }

    await axios.post(
      `${BaseURL}/friend-request/${action}`,
      { requestId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    alert(
      action === 'accept'
        ? '친구 요청을 수락했습니다.'
        : '친구 요청을 거절했습니다.'
    );
    // 요청 수락 또는 거절 후 친구 요청 목록을 새로 고침
    fetchFriendRequests(setFriendRequests, setError);
  } catch (error) {
    alert('처리 중 오류가 발생했습니다: ' + error.message);
  }
};

export default function FriendRequestScreen() {
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadFriendRequests = useCallback(async () => {
    setLoading(true);
    setError('');
    await fetchFriendRequests(setFriendRequests, setError);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadFriendRequests();
  }, [loadFriendRequests]);

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>요청이 없어요..</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.renderItemContainer}>
      <View style={styles.renderItemProfile}>
        <Image source={item.image || cat} style={styles.renderItemImage} />
        <Text style={styles.nickname}>{item.nickname}</Text>
      </View>
      <View style={styles.renderItemButtonSection}>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => handleResponse(item.id, 'accept')}
        >
          <Text style={styles.acceptButtonText}>수락</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rejectButton}
          onPress={() => handleResponse(item.id, 'reject')}
        >
          <Text style={styles.rejectButtonText}>거절</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return <Text style={styles.loadingText}>로딩 중...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={friendRequests}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.flatListContentContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingBottom: 150,
  },
  renderItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width,
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 0.5,
    borderColor: COLOR.GRAY_200,
  },
  renderItemProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  renderItemImage: {
    width: 69,
    height: 69,
    borderRadius: 34.5,
  },
  renderItemButtonSection: {
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
  },
  acceptButton: {
    width: 62,
    height: 27,
    borderRadius: 12,
    backgroundColor: COLOR.BLUE_400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptButtonText: {
    color: COLOR.WHITE,
  },
  rejectButton: {
    width: 62,
    height: 27,
    borderRadius: 12,
    backgroundColor: COLOR.RED,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectButtonText: {
    color: COLOR.WHITE,
  },
  nickname: {
    fontWeight: '600',
    fontSize: 17,
  },
  container: {
    flex: 1,
    paddingVertical: 17,
  },
  errorText: {
    color: 'red',
    marginVertical: 10,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: COLOR.GRAY_400,
  },
  loadingText: {
    fontSize: 18,
    color: COLOR.GRAY_500,
    textAlign: 'center',
    marginVertical: 20,
  },
});
