import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { COLOR } from "../../styles/color";

const tabData = [
  {
    tab: "cat",
    icon: require("../../assets/icons/furIcon.png"),
    label: "털",
  },
  {
    tab: "background",
    icon: require("../../assets/icons/backgroundIcon.png"),
    label: "배경",
  },
];

const BottomSheetHeader = ({ activeTab, onTabChange }) => (
  <View style={styles.headerContainer}>
    {tabData.map(({ tab, icon, label }) => (
      <TouchableOpacity
        key={tab}
        style={styles.tab}
        onPress={() => onTabChange(tab)}
      >
        {icon && <Image source={icon} style={styles.icon} />}
        <Text
          style={[styles.tabText, activeTab === tab && styles.activeTabText]}
        >
          {label}
        </Text>
        {activeTab === tab && <View style={styles.indicator} />}
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: COLOR.GRAY_200,
    backgroundColor: COLOR.WHITE,
    width: "100%",
    shadowColor: COLOR.GRAY_400,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  tab: {
    alignItems: "center",
    paddingVertical: 16,
    position: "relative",
  },
  icon: {
    width: 34,
    height: 34,
    marginBottom: 5,
  },
  tabText: {
    fontSize: 17,
    color: COLOR.GRAY_400,
  },
  activeTabText: {
    color: COLOR.GRAY_400,
  },
  indicator: {
    position: "absolute",
    bottom: -4,
    width: 58,
    height: 7,
    backgroundColor: COLOR.BLUE_400,
    borderRadius: 10,
  },
});

export default BottomSheetHeader;
