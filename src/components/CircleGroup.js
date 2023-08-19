import React from 'react';
import { View } from 'react-native';

const CircleGroup = () => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width:"30%" }}>
      <View style={styles.circle} />
      <View style={styles.circle} />
      <View style={styles.circle} />
      <View style={styles.circle} />
      <View style={styles.circle} />
    </View>
  );
};

const styles = {
  circle: {
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: 'red',
  },
};

export default CircleGroup;
