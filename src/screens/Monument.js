import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  ImageBackground,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icons from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Monument = ({ route }) => {
  const { element } = route.params;
  const navigation = useNavigation();
  const [data, setData] = useState("");

  const [image, setImage] = useState([
    "Explore New Monument",
    "Local Guide",
    "Places to Visit",
  ]);

  function handleBack() {
    navigation.replace("Main");
  }

  function handleWiki() {
    const link = "https://en.wikipedia.org/wiki/India_Gate"; // Replace with your desired link
    Linking.openURL(link);
  }

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "Monuments", element);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const dataref = docSnap.data();
          setData(dataref);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [element]);

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
            <TouchableOpacity onPress={handleBack} style={styles.button}>
              <Icons
                name="heart"
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
        <Text style={styles.subtitle}>
          {data.place}, {data.country}
        </Text>

        <Image
          source={require("../assets/india-gate.png")}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.cardcontainer}>
          <View style={styles.cardWrapper}>
            <Image
              source={require("../assets/glass.png")}
              style={styles.glass}
              resizeMode="contain"
            />
            <View style={styles.card}>
              <View style={styles.column}>
                <Text style={styles.cardTitle}>Date</Text>
                <Text style={styles.cardcontent}>{data.date}</Text>
                <Text style={styles.cardTitle}>Height</Text>
                <Text style={styles.cardcontent}>{data.height}m</Text>
                <Text style={styles.cardTitle}>Designer</Text>
                <Text style={styles.cardcontent}>{data.designer}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.cardTitle}>Origin</Text>
                <Text style={styles.cardcontent}>{data.origin}</Text>
                <Text style={styles.cardTitle}>Width</Text>
                <Text style={styles.cardcontent}>{data.width}m</Text>
                <Text style={styles.cardTitle}>Area</Text>
                <Text style={styles.cardcontent}>{data.area}acre</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.content}>{data.description}</Text>
          <TouchableOpacity onPress={handleWiki} style={styles.seemorebutton}>
            <Text style={styles.seemore}>
              See More{" "}
              <Icon
                name="chevron-down"
                size={15}
                color={"#00ADB5"}
                style={styles.seemoreicon}
              />
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          // decelerationRate={0}
          // snapToInterval={100}
          snapToAlignment={"center"}
          style={styles.tertiarycards}
        >
          {image.map((element, key) => (
            <TouchableOpacity style={styles.tertiarycard} key={key}>
              {/* <Text style={styles.cardTitle}>{element}</Text> */}
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
          {image.map((element, key) => (
            <TouchableOpacity
              style={styles.tertiarycard}
              key={key}
              // onPress={() => handleGuide(element)}
            >
              {/* <Text style={styles.cardTitle}>{element}</Text> */}
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View>
          <Text>Review</Text>
          <View style={styles.card}>
              <View style={styles.column}>
                <Text style={styles.cardTitle}>Date</Text>
                <Text style={styles.cardcontent}>{data.date}</Text>
                <Text style={styles.cardTitle}>Height</Text>
                <Text style={styles.cardcontent}>{data.height}m</Text>
                <Text style={styles.cardTitle}>Designer</Text>
                <Text style={styles.cardcontent}>{data.designer}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.cardTitle}>Origin</Text>
                <Text style={styles.cardcontent}>{data.origin}</Text>
                <Text style={styles.cardTitle}>Width</Text>
                <Text style={styles.cardcontent}>{data.width}m</Text>
                <Text style={styles.cardTitle}>Area</Text>
                <Text style={styles.cardcontent}>{data.area}acre</Text>
              </View>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Monument;

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
    color: "#F8F8F8",
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
  icon: {
    textAlign: "center",
    padding: 3,
  },
  icon1: {
    textAlign: "center",
  },
  image: {
    height: 300,
    aspectRatio: 1,
    alignSelf: "center",
    bottom: -35,
  },
  cardcontainer: {
    //top:-45,
  },

  glass: {
    height: 325,
    aspectRatio: 1,
    alignSelf: "center",
    opacity: 0.95,
  },
  card: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 325,
    width: "100%",
    marginRight: 12,
    top: -30,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    marginTop: "7%",
  },
  column: {
    flex: 1, // Take equal space in the row
    paddingHorizontal: 25,
  },
  cardTitle: {
    color: "#838383",
    //textAlign: "center",
    fontWeight: "400",
    fontSize: 19,
  },
  cardcontent: {
    paddingBottom: 20,
    color: "#dfdfdf",
    fontSize: 21,
  },
  content: {
    paddingBottom: 10,
    color: "#838383",
    fontSize: 18,
    textAlign: "justify",
  },
  seemore: {
    color: "#00ADB5",
    textAlign: "right",
  },
  seemorebutton: {
    textAlign: "center",
  },
  seemoreicon: {
    textAlign: "center",
    top: 3,
  },
  tertiarycards: {
    marginTop: 20,
    flex: 1,
  },
  tertiarycard: {
    backgroundColor: "#1c1c1c",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 150,
    width: 200,
    marginRight: 12,
  },
});
