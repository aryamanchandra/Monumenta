import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Guide = ({ route }) => {
  const { element } = route.params;

  return (
    <View>
      <Text>{element}</Text>
    </View>
  );
};

export default Guide;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        padding: 30,
        paddingBottom:10,
        paddingTop: 60,
      },
      title: {
        fontSize: 40,
        fontWeight: "700",
        color: "#F8F8F8",
      },
});
