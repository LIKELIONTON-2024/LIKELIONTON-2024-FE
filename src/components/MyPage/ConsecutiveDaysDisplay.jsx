import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ConsecutiveDaysDisplay = ({consecutiveDays}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>연속</Text>
      <Text style={[styles.text, styles.daysText]}>{consecutiveDays}일</Text>
      <Text style={styles.text}>째</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  text: {
    fontSize: 24,
    fontWeight: 'light',
  },
  daysText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default ConsecutiveDaysDisplay;
