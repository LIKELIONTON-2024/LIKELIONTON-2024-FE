import React, {useState} from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const CustomToggleSwitch = ({value: initialValue, onValueChange}) => {
  const [value, setValue] = useState(initialValue);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    const newValue = !value;
    setValue(newValue);
    if (typeof onValueChange === 'function') {
      onValueChange(newValue);
    }
  };

  return (
    <TouchableOpacity onPress={toggle}>
      <View style={[styles.container, value && styles.activeContainer]}>
        <View style={styles.circle} />
        <Text style={styles.label}>{value ? 'YES' : 'NO'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 30,
    backgroundColor: 'grey',
    flexDirection: 'row',
    borderRadius: 15,
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'white',
    marginTop: -2,
  },
  activeContainer: {
    backgroundColor: 'blue',
    flexDirection: 'row-reverse',
  },
  label: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 6,
    fontWeight: 'bold',
  },
});

export default CustomToggleSwitch;
