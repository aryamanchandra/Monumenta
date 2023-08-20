import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Trip = () => {
  const [preserve, setPreserve] = useState([
    "Preserve the Monuments",
    "Environment",
    "Places to Visit",
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Past Trip</Text>
          <Text style={styles.nameTitle}></Text>
        </View>
        <ScrollView
          // decelerationRate={0}
          // snapToInterval={100}
          snapToAlignment={"center"}
          style={styles.quaternarycards}
        >
          {preserve.map((element, key) => (
            <TouchableOpacity
              style={styles.card}
              key={key}
              onPress={() => handleGuide(element)}
            >
              <Text style={styles.cardTitle}>{element}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Trip;

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
    color: "#00ADB5",
  },
  header: {
    alignItems: "center",
  },
  card: {
    backgroundColor: "#1c1c1c",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 175,
    width: "100%",
    marginRight: 12,
    marginBottom:20,
  },
  cardTitle: {
    color: "#fff",
    // textAlign: "center",
    fontWeight: 400,
    fontSize: 20,
  },
});
