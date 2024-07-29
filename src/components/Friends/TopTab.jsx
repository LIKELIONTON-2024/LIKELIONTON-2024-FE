import React from 'react';
import {
  View,
  useWindowDimensions,
  StyleSheet,
  Text,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';

import { COLOR } from '../../styles/color';
import CalendarScreen from '../MyPage/CalendarScreen';
import ActivitiesScreen from '../MyPage/ActivitiesScreen';

import UserIcon from '../../assets/icons/addUserIcon.png';
import FriendIcon from '../../assets/icons/friendIcon.png';
import smsIcon from '../../assets/icons/smsIcon.png';
import Add from '../../pages/FriendListScreens/Add';
import FriendsList from '../../pages/FriendListScreens/FriendsList';
import FriendRequest from '../../pages/FriendListScreens/FriendRequest';

const IndicatorImage = require('../../assets/images/indicator.png');
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');

const indicatorW = 120;

const TopTab = () => {
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'add', title: '친구추가', icon: UserIcon },
    { key: 'friendList', title: '친구', icon: FriendIcon },
    { key: 'friendRequest', title: '친구요청', icon: smsIcon },
  ]);

  const handleTabPress = (tab) => {
    setIndex(routes.findIndex((route) => route.key === tab.key));
  };

  const renderScene = SceneMap({
    add: Add,
    friendList: FriendsList,
    friendRequest: FriendRequest,
    // inventory: InventoryScreen,
  });

  const renderTabBar = (props) => {
    const { navigationState } = props;
    const tabWidth = SCREEN_WIDTH / 3;
    const indicatorWidth = indicatorW;
    const indicatorPosition =
      // (tabWidth - indicatorWidth) / 2 + index * tabWidth;
      (tabWidth - indicatorWidth) / 2 + index * tabWidth;
    return (
      <View style={styles.tabBarContainer}>
        <TabBar
          {...props}
          style={styles.tabBar}
          renderLabel={({ route }) => (
            <View style={styles.tabLabelContainer}>
              <Image source={route.icon} style={[styles.icon]} />
              <Text style={[styles.tabLabel]}>{route.title}</Text>
            </View>
          )}
          indicatorStyle={styles.indicator}
          onTabPress={({ route }) => handleTabPress(route)}
        />
        <Image
          source={IndicatorImage}
          style={[styles.indicatorImage, { left: indicatorPosition }]}
        />
      </View>
    );
  };
  return (
    <View style={styles.tabViewContainer}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
      <Text> tab section</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'fixed',
    top: 0,
    zIndex: 10,
  },
  tabBar: {
    backgroundColor: COLOR.WHITE,
    borderBottomColor: COLOR.GRAY_100,
    width: SCREEN_WIDTH,
    borderBottomWidth: 1,
    height: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  tabLabelContainer: {
    alignItems: 'center',
    width: 35,
    height: 46,
  },
  tabLabel: {
    color: COLOR.BLACK,
    fontSize: 10,
    top: 2,
  },
  icon: {
    width: 27,
    height: 27,
    resizeMode: 'contain',
    marginBottom: 7,
  },
  indicator: {
    backgroundColor: COLOR.TRANSPARENT,
  },
  indicatorImage: {
    position: 'absolute',
    bottom: -4,
    width: 120,
    height: 7,
    resizeMode: 'contain',
    zIndex: 11,
  },
  tabViewContainer: {
    flex: 1,
    zIndex: 10,
  },
});

export default TopTab;
