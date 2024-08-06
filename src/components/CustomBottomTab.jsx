import React, { useRef } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  Text,
  Image,
} from 'react-native';

import myPageOff from '../assets/icons/myPageOff.png';
import myPageOn from '../assets/icons/myPageOn.png';
import friendListOff from '../assets/icons/friendListOff.png';
import friendListOn from '../assets/icons/friendListOn.png';
import certificationOff from '../assets/icons/certificationOff.png';
import certificationOn from '../assets/icons/certificationOn.png';
import { COLOR } from '../styles/color';

const CustomBottomTab = ({ state, navigation, insets, descriptors }) => {
  const tab1Value = useRef(new Animated.Value(0)).current;
  const tab2Value = useRef(new Animated.Value(0)).current;
  const tab3Value = useRef(new Animated.Value(0)).current;
  const tab4Value = useRef(new Animated.Value(0)).current;
  const tab5Value = useRef(new Animated.Value(0)).current;

  const animatedValue = {
    0: tab1Value,
    1: tab2Value,
    2: tab3Value,
    3: tab4Value,
    4: tab5Value,
  };

  return (
    <View
      style={[styles.bottomTabBarWrapper, { paddingBottom: insets.bottom }]}
    >
      {state.routes.map((route, index) => {
        const label = route.name;
        const isFocused = state.index === index;

        const iconFlag = (bool) => {
          switch (label) {
            case 'FriendList':
              return (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 5,
                  }}
                >
                  <Image
                    source={isFocused ? friendListOn : friendListOff}
                    style={{ width: 40, height: 40 }}
                  />

                  <Text
                    style={{
                      color: isFocused ? COLOR.YELLOW_400 : COLOR.GRAY_100,
                    }}
                  >
                    친구 목록
                  </Text>
                </View>
              );
            case 'Certification':
              return (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 5,
                  }}
                >
                  <Image
                    source={isFocused ? certificationOn : certificationOff}
                    style={{ width: 40, height: 40 }}
                  />
                  <Text
                    style={{
                      color: isFocused ? COLOR.YELLOW_400 : COLOR.GRAY_100,
                    }}
                  >
                    인증하기
                  </Text>
                </View>
              );
            case 'MyPage':
              return (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 5,
                  }}
                >
                  <Image
                    source={isFocused ? myPageOn : myPageOff}
                    style={{ width: 40, height: 40 }}
                  />
                  <Text
                    style={{
                      color: isFocused ? COLOR.YELLOW_400 : COLOR.GRAY_100,
                    }}
                  >
                    마이페이지
                  </Text>
                </View>
              );
            default:
              return <Text>아이콘</Text>;
          }
        };

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(`${label}`);
          }
        };

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={onPress}
            style={styles.bottomIconWrapper}
          >
            {iconFlag(label)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomTabBarWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-between',
    borderTopWidth: 9,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: COLOR.YELLOW_400,
    backgroundColor: COLOR.BLUE_400,
    paddingTop: 8,
    zIndex: 10,
  },
  bottomIconWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {},
});

export default CustomBottomTab;
