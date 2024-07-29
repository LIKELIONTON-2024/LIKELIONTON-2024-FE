import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { COLOR } from '../../styles/color';
import cat from '../../assets/images/defaultCat.png';
import plus from '../../assets/icons/plusIcon.png';

const { width, height } = Dimensions.get('screen');
const dummy_data = [
  {
    id: 1,
    image: cat,
    nickname: '프론트엔드',
    isFriends: true,
  },
  {
    id: 2,
    image: cat,
    nickname: '프론트엔드',
    isFriends: false,
  },
  {
    id: 3,
    image: cat,
    nickname: '프론트엔드',
    isFriends: true,
  },
];

import checkIcon from '../../assets/icons/checkIcon.png';
export default () => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.renderItemContainer}>
        <View style={styles.renderItemProfile}>
          <Image source={item.image} style={styles.renderItemImage} />
          <Text style={styles.nickname}>{item.nickname}</Text>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.dateTimeText}>1일전</Text>
          <Image
            source={item.isFriends ? checkIcon : plus}
            style={styles.icon}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={dummy_data}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item}_${index}`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    borderRadius: '50%',
  },
  nickname: {
    fontWeight: 'semibold',
    fontSize: 17,
  },
  icon: {
    width: 31,
    height: 31,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    width: 24,
    height: 24,
    right: 15,
    top: 10,
  },
  rightSection: {
    gap: 14,
    alignItems: 'center',
  },
  dateTimeText: {
    fontWeight: 'regular',
    fontSize: 13,
    color: COLOR.GRAY_200,
  },
});
