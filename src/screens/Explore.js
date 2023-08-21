import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const Explore = () => {
  const [data, setData] = useState([
    "Places in the World",
    "South India Tour",
    "Indian Temples",
  ]);

  const [monument, setMonument] = useState([
    "Delhi",
    "Mumbai",
    "Chennai",
    "Kolkata",
    "Bangalore",
    "Cochin",
  ]);

  const [theme, setTheme] = useState([
    "Mughal",
    "Chola",
    "British",
    "Kolkata",
    "Bangalore",
    "Cochin",
  ]);

  useEffect(() => {
    if (showResults) {
      setShowResults(false);
      setSearchResults([]);
    }
  }, [showResults])

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", () => {
      setSearchTerm("");
      setShowResults(false);
      setSearchResults([]);
    });

    return unsubscribe;
  }, [navigation]);

  const navigation = useNavigation();

  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleGuide = (element) => {
    navigation.navigate("Guide", { element });
  };

  const handleCity = (element) => {
    navigation.navigate("City", { element });
  };

  const handleTheme = (element) => {
    navigation.navigate("Theme", { element });
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    q = query(
      collection(db, "Monuments"),
      where("tags", "array-contains", searchTerm.toLowerCase())
    );

    const querySnapshot = await getDocs(q);
  
    const results = querySnapshot.docs.map((doc) => doc.data());
    setSearchResults(results);
  };

  const handleSearchFocus = () => {
    setShowResults(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Explore</Text>
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
          onChangeText={(text) => setSearchTerm(text)}
          onSubmitEditing={handleSearch}
          onFocus={handleSearchFocus}
          style={styles.textInput}
        />
      </View>
      {showResults ? (
        <ScrollView>
          {searchResults.map((element, key) => (
            <TouchableOpacity
              style={styles.card}
              key={key}
              onPress={() => handleGuide(element.city)}
            >
              <Text style={styles.cardTitle}>{element.city}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <ScrollView>
          <ScrollView
            horizontal
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
          <Text style={styles.subTitle}>Cities to explore</Text>
          <ScrollView
            horizontal
            snapToAlignment={"center"}
            style={styles.secondarycards}
            flexDirection="row"
            flex={2}
          >
            {monument.map((element, key) => (
              <TouchableOpacity
                style={styles.secondarycard}
                key={key}
                onPress={() => handleCity(element)}
              >
                <Image
                  source={require("../assets/india-gate.png")}
                  style={styles.image}
                  resizeMode="contain"
                />
                <Text style={styles.secondarycardTitle}>{element}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={styles.subTitle}>Themes to explore</Text>
          <ScrollView
            horizontal
            // decelerationRate={0}
            // snapToInterval={100}
            snapToAlignment={"center"}
            style={styles.tertiarycards}
          >
            {theme.map((element, key) => (
              <TouchableOpacity
                style={styles.tertiarycard}
                key={key}
                onPress={() => handleTheme(element)}
              >
                <Text style={styles.tertiarycardTitle}>{element}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </ScrollView>
      )}
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
  subTitle: {
    color: "#00ADB5",
    fontWeight: 400,
    fontSize: 22,
    marginTop: 28,
    paddingLeft: 3,
    paddingBottom: 10,
  },
  secondarycard: {
    backgroundColor: "#000",
    // paddingVertical: 20,
    // paddingHorizontal: 10,
    borderRadius: 20,
    height: 100,
    width: 100,
    marginRight: 12,
    // marginBottom: 12,
    justifyContent: "center",
    alignContent: "center",
  },
  secondarycardTitle: {
    color: "#fff",
    textAlign: "center",
    fontWeight: 400,
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },
  image: {
    height: 65,
    aspectRatio: 1,
    alignSelf: "center",
  },
  tertiarycards: {
    marginBottom: 10,
    marginTop: 5,
    flex: 1,
  },
  tertiarycard: {
    backgroundColor: "#1c1c1c",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 175,
    width: 175,
    marginRight: 12,
  },
  tertiarycardTitle: {
    color: "#fff",
    textAlign: "center",
    fontWeight: 400,
    fontSize: 20,
  },
});
