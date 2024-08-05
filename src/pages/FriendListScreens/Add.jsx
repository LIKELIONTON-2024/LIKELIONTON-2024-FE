import React, { useState, useCallback } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import { COLOR } from '../../styles/color';
import plus from '../../assets/icons/plusIcon.png';
import searchIcon from '../../assets/icons/searchIcon.png';
import checkIcon from '../../assets/icons/checkIcon.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BaseURL } from '../../apis/api';

const { width } = Dimensions.get('screen');

export default function FriendSearchScreen() {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [toggleStates, setToggleStates] = useState({});

  // 친구 요청 보내기 함수 userId -> receiverId
  const sendFriendRequest = async (receiverId) => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('로그인 정보가 없습니다.');
      }

      await axios.post(
        `${BaseURL}/friend-request/send?receiverId=${receiverId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // 요청 성공 시 토글 상태 업데이트
      setToggleStates((prevState) => ({
        ...prevState,
        [receiverId]: true,
      }));

      Alert.alert('친구 요청이 성공적으로 보내졌습니다.');
    } catch (error) {
      Alert.alert('이미 요청한 친구입니다.');
    }
  };

  const fetchFriends = useCallback(async (searchKeyword = '') => {
    setLoading(true);
    setError('');

    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (!accessToken) {
        setError('로그인 정보가 없습니다.');
        return;
      }
      // 검색한 키워드가 포함되는 친구 nickname 목록 받아오기
      const response = await axios.get(
        `${BaseURL}/friend/list/search?searchKeyword=${searchKeyword}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setFilteredData(response.data);
    } catch (err) {
      setError('데이터를 가져오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  const onPressSearchButton = () => {
    fetchFriends(searchText); // 검색 버튼을 눌렀을 때 친구 목록 가져오기
  };

  const renderItem = ({ item }) => {
    const isItemToggled = toggleStates[item.userId] || false;
    return (
      <View style={styles.renderItemContainer}>
        <View style={styles.renderItemProfile}>
          <Image
            source={{ uri: item.userImage }}
            style={styles.renderItemImage}
          />
          <Text style={styles.nickname}>{item.nickname}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            sendFriendRequest(item.userId); // 친구 요청 보내기
          }}
          disabled={isItemToggled}
        >
          <Image
            source={isItemToggled ? checkIcon : plus}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputSection}>
        <TextInput
          style={styles.textInput}
          placeholder="찾고 싶은 친구를 검색하세요."
          autoCapitalize="none"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity
          onPress={onPressSearchButton}
          style={styles.searchButton}
        >
          <Image source={searchIcon} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>
      {loading && <Text style={styles.loadingText}>로딩 중...</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.userId}_friend`}
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
    borderTopWidth: 0.5,
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
  inputSection: {
    paddingBottom: 20,
    position: 'relative',
  },
  textInput: {
    width: 325,
    height: 51,
    borderWidth: 0.5,
    borderRadius: 12,
    borderColor: COLOR.GRAY_200,
    padding: 10,
  },
  searchButton: {
    position: 'absolute',
    right: 15,
    top: 13,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  errorText: {
    color: 'red',
    marginVertical: 10,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: COLOR.GRAY_400,
    textAlign: 'center',
    marginVertical: 20,
  },
});
