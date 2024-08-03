import React, { useState, useEffect, useCallback } from 'react';
import {
  Alert,
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
import cat from '../../assets/images/sadCat.png';
import { BaseURL } from '../../apis/api';

const { width } = Dimensions.get('screen');

// 친구 요청 목록을 가져오는 함수
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

// 친구 요청 수락 또는 거절 함수
const handleResponse = async (userId, action, setFriendRequests, setError) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('로그인 정보가 없습니다.');
    }

    const url =
      action === 'accept'
        ? `${BaseURL}/friend-request/accept?senderId=${userId}`
        : `${BaseURL}/friend-request/reject?senderId=${userId}`;

    if (action === 'accept') {
      await axios.post(
        url,
        null, // 요청 본문은 비워두기
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } else if (action === 'reject') {
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    Alert.alert(
      action === 'accept'
        ? '친구 요청을 수락했습니다.'
        : '친구 요청을 거절했습니다.'
    );

    // 요청 수락 또는 거절 후 친구 요청 목록을 새로 고침
    await fetchFriendRequests(setFriendRequests, setError);
  } catch (error) {
    alert('처리 중 오류가 발생했습니다: ' + error.message);
  }
};

export default function FriendRequestScreen() {
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const loadFriendRequests = useCallback(async () => {
    setLoading(true);
    setError('');
    await fetchFriendRequests(setFriendRequests, setError);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadFriendRequests();
  }, [loadFriendRequests]);

  const onPressAcceptButton = ({ item }) => {
    handleResponse(item.userId, 'accept', setFriendRequests, setError);
  };
  const onPressRejectButton = ({ item }) => {
    handleResponse(item.userId, 'reject', setFriendRequests, setError);
  };
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchFriendRequests(setFriendRequests, setError);
    setRefreshing(false);
  }, []);

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Image source={cat} style={{ width: 167, height: 167 }} />
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.emptyText}>친구 요청이 없어요;ㅅ;</Text>
        <Text style={styles.emptyText}>
          프로필을 꾸며서 친구를 만들어 보세요!
        </Text>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.renderItemContainer}>
      <View style={styles.renderItemProfile}>
        <Image
          source={{ uri: item.userImage }}
          style={styles.renderItemImage}
        />
        <Text style={styles.nickname}>{item.nickname}</Text>
      </View>
      <View style={styles.renderItemButtonSection}>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => onPressAcceptButton({ item })}
        >
          <Text style={styles.acceptButtonText}>수락</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rejectButton}
          onPress={() => onPressRejectButton({ item })}
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
        keyExtractor={(item) => `${item.userId}_request`}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.flatListContentContainer}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={onRefresh}
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
    marginTop: 100,
  },
  emptyText: {
    fontSize: 17,
    fontWeight: 'regular',
    color: COLOR.GRAY_400,
  },
  loadingText: {
    fontSize: 18,
    color: COLOR.GRAY_400,
    textAlign: 'center',
    marginVertical: 20,
  },
});
