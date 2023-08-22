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
import { useNavigation } from "@react-navigation/native";
import Icons from "react-native-vector-icons/FontAwesome5";

const Home = () => {
  const [email, setEmail] = useState("");
  const [userinfo, setUser] = useState([]);
  const [data, setData] = useState([
    "Places Nearby",
    "Local Guide",
    "Top 10 Monuments",
  ]);
  const [monument, setMonument] = useState([
    "India Gate",
    "Eiffel Tower",
    "Taj Mahal",
    "India Gate",
    "Eiffel Tower",
    "Taj Mahal",
  ]);
  const [preserve, setPreserve] = useState([
    "Preserve the Monuments",
    "Environment",
    "Places to Visit",
  ]);
  const [plan, setPlan] = useState([
    "Your Delhi Plan",
    "Your Paris Plan",
    "Your SF Plan",
  ]);
  const navigation = useNavigation();
  const user = auth.currentUser;

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
          setUser(data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [user]);

  const handlePlan = (element) => {
    navigation.navigate("Plan", { element });
  };

  const handlePage = (element) => {
    navigation.navigate("Monument", { element });
  };

  const handleGuide = (element) => {
    navigation.navigate("Guide", { element });
  };

  const handlePreserve = (element) => {
    navigation.navigate("Preserve", { element });
  };

  const handleNearby = (element) => {
    navigation.navigate("City", { element });
  };

  const handleGeneral = (element) => {
    navigation.navigate("Explore");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>
          Hi, {"\n"}
          <Text style={{ textTransform: "capitalize" }}>{userinfo.firstname} </Text>
        </Text>
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
        {(!userinfo.location) ? (
          <View>
            <View style={styles.header}>
              <Text style={styles.subTitle}>Monuments to explore</Text>
              <TouchableOpacity
                style={styles.seemoreheader}
                onPress={() => handleGeneral()}
              >
                <Text style={styles.seemore}>See More</Text>
                <Icons name="angle-right" style={styles.icon1} />
              </TouchableOpacity>
            </View>
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
                  onPress={() => handlePage(element)}
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
          </View>
        ) : (
          <View>
            <View style={styles.header}>
              <Text style={styles.subTitle}>Close to You</Text>
              <TouchableOpacity
                style={styles.seemoreheader}
                onPress={() => handleNearby(userinfo.location)}
              >
                <Text style={styles.seemore}>See More</Text>
                <Icons name="angle-right" style={styles.icon1} />
              </TouchableOpacity>
            </View>
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
                  onPress={() => handlePage(element)}
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
          </View>
        )}

        <Text style={styles.subTitle}>Your Travel Plans</Text>

        <ScrollView
          horizontal
          // decelerationRate={0}
          // snapToInterval={100}
          snapToAlignment={"center"}
          style={styles.tertiarycards}
        >
          {plan.map((element, key) => (
            <TouchableOpacity
              style={styles.tertiarycard}
              key={key}
              onPress={() => handlePlan(element)}
            >
              <Text style={styles.tertiarycardTitle}>{element}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.subTitle}>#SaveTheMonuments</Text>

        <ScrollView
          horizontal
          // decelerationRate={0}
          // snapToInterval={100}
          snapToAlignment={"center"}
          style={styles.quaternarycards}
        >
          {preserve.map((element, key) => (
            <TouchableOpacity
              style={styles.quaternarycard}
              key={key}
              onPress={() => handlePreserve(element)}
            >
              <Text style={styles.quaternarycardTitle}>{element}</Text>
            </TouchableOpacity>
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
    paddingBottom: 10,
    paddingTop: 60,
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: "#F8F8F8",
    paddingBottom: 20,
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
  header: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 28,
  },
  subTitle: {
    color: "#00ADB5",
    fontWeight: 400,
    fontSize: 22,
    paddingLeft: 3,
  },
  seemoreheader: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  seemore: {
    paddingTop: 5,
    color: "#00ADB5",
  },
  icon1: {
    paddingLeft: 3,
    paddingTop: 5,
    fontSize: 20,
    color: "#00ADB5",
  },
  secondarycards: {
    marginTop: 18,
    flex: 1,
    marginBottom: 35,
  },
  secondarycard: {
    backgroundColor: "#000",
    // paddingVertical: 20,
    // paddingHorizontal: 10,
    borderRadius: 20,
    height: 100,
    width: 100,
    marginRight: 12,
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
    aspectRatio: 1,
    alignSelf: "center",
  },
  tertiarycards: {
    marginBottom: 35,
    marginTop: 15,
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
  quaternarycards: {
    marginBottom: 10,
    marginTop: 10,
    flex: 1,
  },
  quaternarycard: {
    backgroundColor: "#1c1c1c",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 175,
    width: 300,
    marginRight: 12,
  },
  quaternarycardTitle: {
    color: "#fff",
    textAlign: "center",
    fontWeight: 400,
    fontSize: 20,
  },
});
