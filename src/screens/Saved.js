import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import HeartIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icons from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Saved = () => {
  const navigation = useNavigation();

  const [monument, setMonument] = useState([]);
  const [city, setCity] = useState([]);

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const display = async () => {
      const docRef = doc(db, "User-Data", auth.currentUser?.email);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      setCity(data.savedcity);
      setMonument(data.savedmonument);
    };
    display();
  }, []);

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
        </View>
        <Text style={styles.title}>Saved</Text>
        <Text style={styles.subtitle}>Monuments</Text>
        <View
          //   horizontal
          // decelerationRate={0}
          // snapToInterval={100}
          snapToAlignment={"center"}
          style={styles.herocards}
        >
          {monument &&
            monument.map((element, key) => (
              <TouchableOpacity
                style={styles.card}
                key={key}
                onPress={() => handleGuide(element)}
              >
                <Image
                  source={require("../assets/india-gate.png")}
                  style={styles.image}
                  resizeMode="contain"
                />
                <Text style={styles.cardTitle}>{element}</Text>
              </TouchableOpacity>
            ))}
        </View>
        <Text style={styles.subtitle}>City</Text>
        <View
          //   horizontal
          // decelerationRate={0}
          // snapToInterval={100}
          snapToAlignment={"center"}
          style={styles.herocards}
        >
          {city &&
            city.map((element, key) => (
              <TouchableOpacity
                style={styles.card}
                key={key}
                onPress={() => handleGuide(element)}
              >
                <Text style={styles.cardTitle}>{element}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Saved;

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
    marginBottom: 15,
  },
  subtitle: {
    color: "#00ADB5",
    fontWeight: "400",
    fontSize: 22,
    paddingLeft: 3,
    // textAlign: "center",
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
  herocards: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  card: {
    backgroundColor: "#1c1c1c",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    // height: "80%",
    width: "32%",
    marginBottom: 20,
  },
  cardTitle: {
    color: "#fff",
    textAlign: "center",
    fontWeight: 400,
    fontSize: 15,
  },
  image: {
    height: 50,
    aspectRatio: 1,
    alignSelf: "center",
  },
});
