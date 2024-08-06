import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BaseURL } from '../../apis/api';
import { COLOR } from '../../styles/color';
import cat from '../../assets/images/sadCat.png';
import arrow from '../../assets/icons/arrowRightIcon.png';
import FriendDetail from '../../components/Friends/FriendDetail';

const { width } = Dimensions.get('screen');

export default () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false); // 새로고침 상태 추가
  const [isVisible, setIsVisible] = useState(false);
  const [friendId, setFirendId] = useState('');
  const [firendName, setFriendName] = useState('');
  const [lastTime, setLastTime] = useState(new Date());

  const fetchFriends = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        setError('로그인 정보가 없습니다.');
        return;
      }

      const response = await axios.get(`${BaseURL}/friend/list`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setFriends(response.data);
    } catch (err) {
      setError('데이터를 가져오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
      setRefreshing(false); // 새로고침 상태 종료
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchFriends();
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Image source={cat} style={{ width: 167, height: 167 }} />
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.emptyText}>아직 친구 목록에 아무도 없어요;ㅅ;</Text>
        <Text style={styles.emptyText}>친구를 추가해서 함께 즐겨 보세요!</Text>
      </View>
    </View>
  );

  const onPressOpenModal = ({ item }) => {
    setFirendId(item.userId);
    setFriendName(item.nickname);
    setIsVisible(true);
  };

  const renderItem = ({ item }) => (
    <View key={item.userId} style={styles.renderItemContainer}>
      <View style={styles.renderItemProfile}>
        <Image
          source={{ uri: item.userImage }}
          style={styles.renderItemImage}
        />
        <Text style={styles.nickname}>{item.nickname}</Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.dateTimeText}>1일전</Text>
        <TouchableOpacity
          onPress={() => {
            onPressOpenModal({ item });
          }}
        >
          <Image source={arrow} style={styles.icon} />
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
    <>
      <View style={styles.container}>
        <FlatList
          data={friends}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item}${index}_friend`}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={styles.flatListContentContainer}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing} // 새로고침 상태 전달
          onRefresh={onRefresh} // 새로고침 함수 연결
        />
      </View>
      <FriendDetail
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        friendId={friendId}
        friendName={firendName}
      />
    </>
  );
};

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
  nickname: {
    fontWeight: '600',
    fontSize: 17,
  },
  icon: {
    width: 31,
    height: 31,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 17,
  },
  loadingText: {
    fontSize: 18,
    color: COLOR.GRAY_500,
    marginTop: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginTop: 20,
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
  rightSection: {
    alignItems: 'center',
  },
  dateTimeText: {
    fontSize: 13,
    color: COLOR.GRAY_200,
    marginBottom: 8,
  },
});
