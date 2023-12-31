import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Feather";
import HeartIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const Theme = ({ route }) => {
  const { element } = route.params;
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");

  const [data, setData] = useState(["Monument 1", "Monument 2", "Monument 3"]);

  const handleChange = (text) => {
    setSearchTerm(text);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const saved = () => {
    setIsHeartFilled((prevState) => !prevState);
  };

  const [showDisplayResults, setDisplayResults] = useState([]);

  useEffect(() => {
    if (showResults) {
      setShowResults(false);
      setSearchResults([]);
    }

  }, [showResults]);

  useEffect(() => {
    const display = async () => {
      q = query(
        collection(db, "Monuments"),
        where("tags", "array-contains", element.toLowerCase())
      );
  
      const querySnapshot = await getDocs(q);
  
      const displayresults = querySnapshot.docs.map((doc) => doc.data());
      setDisplayResults(displayresults);
    }

    display();
  },[showDisplayResults])

  useEffect(() => {
    const unsubscribe = navigation.addListener("tabPress", () => {
      setSearchTerm("");
      setShowResults(false);
      setSearchResults([]);
    });

    return unsubscribe;
  }, [navigation]);

  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    q = query(
      collection(db, "Monuments"),
      where("tags", "array-contains", element.toLowerCase())
    );

    const querySnapshot = await getDocs(q);

    const results = querySnapshot.docs
      .map((doc) => doc.data())
      .filter((doc) => doc.tags.includes(searchTerm.toLowerCase()));
    setSearchResults(results);
  };

  const handleSearchFocus = () => {
    setShowResults(true);
  };

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
            <TouchableOpacity onPress={saved} style={styles.button}>
              <HeartIcons
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
          <ScrollView
            //   horizontal
            // decelerationRate={0}
            // snapToInterval={100}
            snapToAlignment={"center"}
            style={styles.herocards}
          >
            {showDisplayResults.map((element, key) => (
              <TouchableOpacity
                style={styles.card}
                key={key}
                onPress={() => handleGuide(element)}
              >
                <Text style={styles.cardTitle}>{element.city}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Theme;

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
