import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 65, 
    position: 'relative',
    marginTop: 10,
  },
  labelContainer: {
    position: 'absolute',
    backgroundColor: '#000',
    top: -10,
    left: 25,
    padding: 5,
    zIndex: 50,
  },
  label: {
    color:"#B0B0B0"
  },
  textInput: {
    flex: 1, 
    borderWidth: 1, 
    justifyContent: 'flex-end',
    paddingHorizontal: 25,
    paddingVertical: 0,
    margin:5,
    borderRadius: 30,
    borderColor:"#B0B0B0",
    color:"#fff"
  },
})

const CustomTextInput = ({ label, style, placeholdertext, ...props}) => (
  <View style={styles.container}>
    <View style={styles.labelContainer}>
      <Text style={styles.label}>{label}</Text>
    </View>
    <TextInput style={styles.textInput} placeholder={placeholdertext} placeholderTextColor="#4E4E4E"/>
  </View>
);

export default CustomTextInput;