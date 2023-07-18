import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const user = auth.currentUser;
  const [data, setData] = useState([
    "Explore New Monument",
    "Local Guide",
    "Places to Visit",
  ]);
  const [monument, setMonument] = useState([
    "India Gate",
    "Eiffel Tower",
    "Taj Mahal",
    "India Gate",
    "Eiffel Tower",
    "Taj Mahal",
  ]);

  const navigation = useNavigation();


  useEffect(() => {
    if (user) {
      setEmail(user.email);
    } else {
      console.log("No user signed in");
    }

    const fetchData = async () => {
      const docRef = doc(db, "User-Data", user.email);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFirstName(data.firstname);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [user]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (text) => {
    setSearchTerm(text);
  };

  const handlePage = (element) => {
      navigation.navigate("Monument", { element });
  };

  const handleGuide = (element) => {
    navigation.navigate("Guide", { element });
};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
        <Text style={styles.title}>
          Hi, {"\n"}
          <Text style={{ textTransform: "capitalize" }}>{firstName} </Text>
        </Text>
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
          style={styles.herocards}
        >
          {data.map((element, key) => (
            <TouchableOpacity style={styles.card} key={key} onPress={() => handleGuide(element)}>
              <Text style={styles.cardTitle}>{element}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text style={styles.subTitle}>Monuments Close to You</Text>
        <ScrollView
          horizontal
          snapToAlignment={"center"}
          style={styles.secondarycards}
          flexDirection="row"
          flex={2}
        >
          {monument.map((element, key) => (
            <TouchableOpacity style={styles.secondarycard} key={key} onPress={() => handlePage(element)}>
              <Image
                source={require("../assets/india-gate.png")}
                style={styles.image}
                resizeMode="contain"
              />
              <Text style={styles.secondarycardTitle}>{element}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView
          horizontal
          // decelerationRate={0}
          // snapToInterval={100}
          snapToAlignment={"center"}
          style={styles.tertiarycards}
        >
          {data.map((element, key) => (
            <View style={styles.tertiarycard} key={key}>
              <Text style={styles.tertiarycardTitle}>{element}</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

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
    flex: 1,
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
    fontWeight: 400,
    fontSize: 20,
  },
  subTitle:{
    color: "#00ADB5",
    fontWeight: 400,
    fontSize: 22,
    marginTop:28,
    paddingLeft:3,
  },
  secondarycards: {
    marginTop: 18,
    flex: 1,
  },
  secondarycard: {
    backgroundColor: "#000",
    // paddingVertical: 20,
    // paddingHorizontal: 10,
    borderRadius: 20,
    height: 100,
    width: 100,
    marginRight: 12,
    marginBottom: 12,
    justifyContent: "center",
    alignContent: "center",
  },
  secondarycardTitle: {
    color: "#fff",
    textAlign: "center",
    fontWeight: 400,
    fontSize: 15,
    paddingTop: 5,
  },
  image: {
    height: 65,
    aspectRatio:1,
    alignSelf: "center",
  },
  tertiarycards: {
    marginBottom: 10,
    marginTop:20,
    flex: 1,
  },
  tertiarycard: {
    backgroundColor: "#1c1c1c",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 175,
    width: 300,
    marginRight: 12,
  },
  tertiarycardTitle: {
    color: "#fff",
    textAlign: "center",
    fontWeight: 400,
    fontSize: 20,
  },
});
