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
import cat from '../../assets/images/defaultCat.png';
import arrow from '../../assets/icons/arrowRightIcon.png';
import FriendDetail from '../../components/Friends/FriendDetail';

const { width } = Dimensions.get('screen');

const dummy_data = [
  {
    userId: 1,
    nickname: '진짜이준영',
    userImage: cat,
  },
];
export default () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const onPressOpenModal = () => {
    setIsVisible(true);
  };
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!accessToken) {
          setError('로그인 정보가 없습니다.');
          return;
        }

        const res = await axios.get(`${BaseURL}/friend/list`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(res.data);
        setFriends(res.data);
      } catch (err) {
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, []);

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>친구가 없어요..</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.renderItemContainer}>
      <View style={styles.renderItemProfile}>
        <Image source={item.userImage || cat} style={styles.renderItemImage} />
        <Text style={styles.nickname}>{item.nickname}</Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.dateTimeText}>1일전</Text>
        <TouchableOpacity onPress={onPressOpenModal}>
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
          data={dummy_data}
          renderItem={renderItem}
          keyExtractor={(item) => `${item}_friend`}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={styles.flatListContentContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <FriendDetail isVisible={isVisible} setIsVisible={setIsVisible} />
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
    marginTop: 20,
  },
  emptyText: {
    fontSize: 18,
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
