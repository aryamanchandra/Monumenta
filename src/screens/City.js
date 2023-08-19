import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Feather";

const City = ({ route }) => {
  const { element } = route.params;
  const [searchTerm, setSearchTerm] = useState("");

  const [data, setData] = useState([
    "Monument 1",
    "Monument 2",
    "Monument 3",
  ]);

  const handleChange = (text) => {
    setSearchTerm(text);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>{element}</Text>
        <View style={styles.inputContainer}>
          <Icon
            name="search"
            size={20}
            color="#828282"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search..."
            placeholderTextColor="#4E4E4E"
            value={searchTerm}
            onChangeText={handleChange}
            style={styles.textInput}
          />
        </View>
        <ScrollView
          //   horizontal
          // decelerationRate={0}
          // snapToInterval={100}
          snapToAlignment={"center"}
          style={styles.herocards}
        >
          {data.map((element, key) => (
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

export default City;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 30,
    paddingBottom: 10,
    paddingTop: 60,
  },
  title: {
    fontSize: 50,
    fontWeight: "700",
    color: "#00ADB5",
    marginTop: 15,
    textAlign: "center",
  },
  subtitle: {
    color: "#00ADB5",
    fontWeight: "400",
    fontSize: 22,
    paddingLeft: 3,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
    borderColor: "#3c3c3c",
    borderWidth: 2,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    color: "#fff",
  },
  card: {
    backgroundColor: "#1c1c1c",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 175,
    width: "100%",
    marginRight: 12,
    marginBottom: 20,
  },
  cardTitle: {
    color: "#fff",
    textAlign: "center",
    fontWeight: 400,
    fontSize: 20,
  },
});
