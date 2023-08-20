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
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

const City = ({ route }) => {
  const { element } = route.params;
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");

  const [data, setData] = useState(["Monument 1", "Monument 2", "Monument 3"]);

  const handleChange = (text) => {
    setSearchTerm(text);
  };

  const handleBack = () => {
    navigation.replace("Main");
  };

  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const saved = () => {
    setIsHeartFilled((prevState) => !prevState);
  };

  const [isFilterFilled, setIsFilterFilled] = useState(false);
  const filtered = () => {
    setIsFilterFilled((prevState) => !prevState);
    navigation.navigate("Filter");
  };

  // const [tags, setTags] = useState(["Type", "Ratings", "Entry", "Neighbourhood", "Ratings", "Entry"]);
  const [tags, setTags] = useState([
    "Nearby",
    "4+ Rating",
    "Free Entry",
    "Nearby",
    "Nearby",
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={handleBack} style={styles.button}>
            <Icons
              name="angle-left"
              size={30}
              color={"#fff"}
              style={styles.icon1}
            />
          </TouchableOpacity>
          <View style={styles.rightButtons}>
            <TouchableOpacity onPress={filtered} style={styles.button}>
              <MaterialIcons
                name={isFilterFilled ? "filter" : "filter-outline"}
                size={25}
                color={"#fff"}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={saved} style={styles.button}>
              <MaterialIcons
                name={isHeartFilled ? "cards-heart" : "cards-heart-outline"}
                size={25}
                color={"#fff"}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleBack} style={styles.button}>
              <Icons
                name="share"
                size={25}
                color={"#fff"}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
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
          horizontal
          // decelerationRate={0}
          // snapToInterval={100}
          snapToAlignment={"center"}
          style={styles.tags}
        >
          {tags.map((element, key) => (
            <View style={styles.tagcont} key={key}>
              <Text style={styles.tagname}>{element}</Text>
            </View>
          ))}
        </ScrollView>
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
    marginBottom: 5,
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
  icon: {
    textAlign: "center",
    padding: 3,
  },
  icon1: {
    textAlign: "center",
  },
  icon2: {
    textAlign: "center",
    paddingTop: 1,
  },
  tags: {
    marginBottom: 10,
    marginTop: 5,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tagcont: {
    // backgroundColor: "#1c1c1c",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 20,
    height: 35,
    width: 100,
    marginRight: 5,
    borderColor: "#1c1c1c",
    borderWidth: 2,
    marginBottom: 5,
  },
  tagname: {
    color: "#fff",
    textAlign: "center",
    fontWeight: 400,
    fontSize: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  rightButtons: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#1c1c1c",
    width: 47,
    padding: 7,
    borderRadius: 30,
    marginHorizontal: 5,
    textAlign: "center",
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
