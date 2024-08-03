import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import { COLOR } from "../../styles/color";

const CustomToast = ({ message, visible, onClose }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }).start(() => {
          if (onClose) onClose();
        });
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 140,
    width: 312,
    height: 46,
    borderRadius: 30,
    backgroundColor: COLOR.GRAY_200,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  text: {
    color: "white",
    fontSize: 15,
  },
});

export default CustomToast;
