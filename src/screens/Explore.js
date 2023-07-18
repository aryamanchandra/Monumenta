import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";

const Explore = () => {
  const [data, setData] = useState([
    "Explore New Monument",
    "Local Guide",
    "Places to Visit",
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Explore</Text>
      <ScrollView
        horizontal
        snapToAlignment="center"
        contentContainerStyle={styles.herocards}
      >
        {data.map((element, key) => (
          <View style={styles.card} key={key}>
            <Text style={styles.cardTitle}>{element}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 30,
    paddingBottom: 10,
    paddingTop: 60,
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: "#F8F8F8",
    paddingBottom:15,
  },
  herocards: {
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#1c1c1c",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 175,
    width: 300,
    marginRight: 12,
  },
  cardTitle: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "400",
    fontSize: 20,
  },
});
