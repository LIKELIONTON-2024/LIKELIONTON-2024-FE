import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLOR } from '../../styles/color';
import cat from '../../assets/images/defaultCat.png';
import plus from '../../assets/icons/plusIcon.png';
import searchIcon from '../../assets/icons/searchIcon.png';
import checkIcon from '../../assets/icons/checkIcon.png';

const { width, height } = Dimensions.get('screen');
const dummy_data = [
  {
    id: 1,
    image: cat,
    nickname: '프론트엔드d',
    isFriends: true,
  },
  {
    id: 2,
    image: cat,
    nickname: '백엔드a',
    isFriends: false,
  },
  {
    id: 3,
    image: cat,
    nickname: '풀스택c',
    isFriends: true,
  },
  {
    id: 4,
    image: cat,
    nickname: '프론트엔드c',
    isFriends: true,
  },
  {
    id: 5,
    image: cat,
    nickname: '백엔드v',
    isFriends: false,
  },
  {
    id: 6,
    image: cat,
    nickname: '풀스택v',
    isFriends: true,
  },
  {
    id: 7,
    image: cat,
    nickname: '프론트엔드a',
    isFriends: true,
  },
  {
    id: 8,
    image: cat,
    nickname: '백엔드a',
    isFriends: false,
  },
  {
    id: 9,
    image: cat,
    nickname: '풀스택s',
    isFriends: true,
  },
];

export default () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(dummy_data);

  useEffect(() => {
    if (searchText === '') {
      setFilteredData(dummy_data);
    } else {
      setFilteredData(
        dummy_data.filter((item) => item.nickname.includes(searchText))
      );
    }
  }, [searchText]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.renderItemContainer}>
        <View style={styles.renderItemProfile}>
          <Image source={item.image} style={styles.renderItemImage} />
          <Text style={styles.nickname}>{item.nickname}</Text>
        </View>
        <TouchableOpacity>
          <Image
            source={item.isFriends ? checkIcon : plus}
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
          placeholder="닉네임을 입력해주세요."
          autoCapitalize="none"
          value={searchText}
          onChangeText={setSearchText}
        />
        <Image source={searchIcon} style={styles.searchIcon} />
      </View>
      <View>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 150 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flatList: {
    paddingBottom: 40,
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
  searchIcon: {
    position: 'absolute',
    width: 24,
    height: 24,
    right: 15,
    top: 13,
  },
});
