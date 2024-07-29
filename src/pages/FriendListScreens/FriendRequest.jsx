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

import searchIcon from '../../assets/icons/searchIcon.png';
import checkIcon from '../../assets/icons/checkIcon.png';
export default () => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.renderItemContainer}>
        <View style={styles.renderItemProfile}>
          <Image source={item.image} style={styles.renderItemImage} />
          <Text style={styles.nickname}>{item.nickname}</Text>
        </View>
        <View style={styles.renderItemButtonSection}>
          <TouchableOpacity style={styles.acceptButton}>
            <Text style={styles.acceptButtonText}>수락</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rejectButton}>
            <Text style={styles.rejectButtonText}>거절</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View>
      <FlatList
        data={dummy_data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      />
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
    fontWeight: 'semibold',
    fontSize: 17,
  },
});
