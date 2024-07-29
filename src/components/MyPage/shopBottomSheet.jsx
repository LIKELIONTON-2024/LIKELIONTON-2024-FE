import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {COLOR} from '../../libs/Color';

const imagesByTab = {
  눈: [
    require('../../assets/images/defaultCat.png'),
    require('../../assets/images/defaultCat.png'),
    require('../../assets/images/defaultCat.png'),
    require('../../assets/images/defaultCat.png'),
  ],
  털: [
    require('../../assets/images/defaultCat.png'),
    require('../../assets/images/defaultCat.png'),
    require('../../assets/images/defaultCat.png'),
    require('../../assets/images/defaultCat.png'),
  ],
  배경: [
    require('../../assets/images/defaultCat.png'),
    require('../../assets/images/defaultCat.png'),
    require('../../assets/images/defaultCat.png'),
    require('../../assets/images/defaultCat.png'),
  ],
  악세사리: [
    require('../../assets/images/defaultCat.png'),
    require('../../assets/images/defaultCat.png'),
    require('../../assets/images/defaultCat.png'),
    require('../../assets/images/defaultCat.png'),
  ],
};

const ShopBottomSheet = ({snapPoints, activeTab, setActiveTab}) => {
  const bottomSheetRef = useRef(null);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {['눈', '털', '배경', '악세사리'].map(tab => (
        <TouchableOpacity
          key={tab}
          style={styles.tab}
          onPress={() => setActiveTab(tab)}>
          <Text
            style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
            {tab}
          </Text>
          {activeTab === tab && <View style={styles.indicator} />}
        </TouchableOpacity>
      ))}
    </View>
  );

  // 선택된 탭에 따른 이미지 목록
  const images = imagesByTab[activeTab] || [];

  const renderItem = ({item}) => (
    <View style={styles.gridItem}>
      <Image source={item} style={styles.image} />
    </View>
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      handleComponent={() => (
        <View style={styles.handleContainer}>
          <View style={styles.handle} />
          {renderHeader()}
        </View>
      )}>
      <View style={styles.content}>
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.grid}
        />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  handleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  handle: {
    width: 73,
    height: 5,
    backgroundColor: COLOR.GRAY_200,
    borderRadius: 100,
    marginVertical: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 27,
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR.GRAY_300,
    backgroundColor: COLOR.WHITE,
    width: '100%',
    shadowColor: COLOR.GRAY_400,
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  tab: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    position: 'relative',
  },
  tabText: {
    fontSize: 16,
    color: COLOR.GRAY_400,
  },
  activeTabText: {
    color: COLOR.BLUE_400,
  },
  indicator: {
    position: 'absolute',
    bottom: -4,
    width: 58,
    height: 7,
    backgroundColor: COLOR.BLUE_400,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  grid: {
    flexGrow: 1,
  },
  gridItem: {
    flex: 1,
    margin: 5,
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default ShopBottomSheet;
