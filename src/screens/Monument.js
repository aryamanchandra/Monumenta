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
import HeartIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import {
  deleteField,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Monument = ({ route }) => {
  const { element } = route.params;
  const navigation = useNavigation();
  const [data, setData] = useState("");
  const [detail, setDetail] = useState([
    "Timing",
    "Contact No.",
    "Wheelchair",
    "Location",
    "City",
    "Pincode",
    "Metro Station",
    "Entry",
    "Days Closed",
    "Photography Cost",
  ]);
  // "Timing": "9:00AM - 5:00PM",
  // "Contact No.": "91-11-23365358",
  // "Wheelchair": "Yes",
  // "Location":"Near Rajpath",
  // "City":"New Delhi",
  // "Pincode":"110001",
  // "Metro Station":"Pragati Madan",
  // "Entry":"Free",
  // "Days Closed":"None",
  // "Photography Cost":"None"

  const [image, setImage] = useState([
    "Explore New Monument",
    "Local Guide",
    "Places to Visit",
  ]);

  const [theme, setTheme] = useState([
    "Mughal",
    "Chola",
    "British",
    "Kolkata",
    "Bangalore",
    "Cochin",
  ]);

  const [news, setNews] = useState(["Mughal", "Chola", "British", "Kolkata"]);

  const [tags, setTags] = useState(["Mughal", "Delhi", "British"]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleWiki = () => {
    const link = "https://en.wikipedia.org/wiki/India_Gate"; // Replace with your desired link
    Linking.openURL(link);
  };

  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const saved = async () => {
    const email = auth.currentUser?.email;
    const docRef = doc(db, "User-Data", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      if (!isHeartFilled) {
        await updateDoc(doc(db, "User-Data", email), {
          savedmonument: arrayUnion(element),
        });
        setIsHeartFilled(true);
      } else {
        if ("savedcity" in data) {
          await updateDoc(doc(db, "User-Data", email), {
            savedmonument: arrayRemove(element),
          });
          setIsHeartFilled(false);
        }
      }
    }
  };

  useEffect(() => {
    const heartcheck = async () => {
      const docRef = doc(db, "User-Data", auth.currentUser?.email);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      if (data && data.savedmonument && data.savedmonument.includes(element)) {
        setIsHeartFilled(true);
      }
    };
    heartcheck();
  }, [isHeartFilled]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = await AsyncStorage.getItem(element);

        if (cachedData) {
          setData(JSON.parse(cachedData));
        } else {
          const docRef = doc(db, "Monuments", element);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const dataref = docSnap.data();
            setData(dataref);
            
            await AsyncStorage.setItem(element, JSON.stringify(dataref));
          }
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [element]);

  const removeCachedData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`Successfully removed ${key} from AsyncStorage`);
    } catch (error) {
      console.error(`Error removing ${key} from AsyncStorage:`, error);
    }
  };

  const handleRemoveCachedData = async () => {
    try {
      // Replace 'element' with the appropriate key you used to cache the data
      await removeCachedData(element);
    } catch (error) {
      console.error('Error removing cached data:', error);
    }
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
                size={30}
                color={"#fff"}
                style={styles.icon2}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRemoveCachedData} style={styles.button}>
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
          {data.city}, {data.country}
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
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.heading}>Review</Text>
          <Image
            source={require("../assets/review-glass.png")}
            style={styles.reviewglass}
            resizeMode="contain"
          />
          <Image
            source={require("../assets/review-glass.png")}
            style={styles.reviewglass}
            resizeMode="contain"
          />
          <View style={styles.reviewrow}>
            <Text style={styles.seemore2}>Write a review</Text>
            <View>
              <TouchableOpacity
                onPress={handleWiki}
                style={styles.seemorebutton}
              >
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
          </View>
        </View>
        <View style={{ marginBottom: 30 }}>
          <Text style={styles.heading}>Details</Text>
          {detail.map((item, index) => (
            <View style={styles.row} key={index}>
              <View style={styles.settingLeft}>
                <Text style={styles.textTitle}>{item}</Text>
              </View>
              <View style={styles.settingRight}>
                <Text style={styles.text}>
                  {data[item.toLowerCase().replace(/\s/g, "")]}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.heading}>Tickets</Text>
          <Image
            source={require("../assets/ticket-glass.png")}
            style={styles.ticketglass}
            resizeMode="contain"
          />
          <Text style={styles.ticketText}>
            This place doesn’t require any tickets
          </Text>
        </View>
        <View>
          <Text style={styles.heading}>Inside Map</Text>
          <Image
            source={require("../assets/review-glass.png")}
            style={styles.reviewglass}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.heading}>Events</Text>
        <ScrollView
          horizontal
          // decelerationRate={0}
          // snapToInterval={100}
          snapToAlignment={"center"}
          style={styles.tertiarycards2}
        >
          {theme.map((element, key) => (
            <View style={styles.tertiarycard2} key={key}>
              <Text style={styles.tertiarycardTitle2}>{element}</Text>
            </View>
          ))}
        </ScrollView>
        <Text style={styles.heading}>News</Text>
        <ScrollView
          horizontal
          // decelerationRate={0}
          // snapToInterval={100}
          snapToAlignment={"center"}
          style={styles.quarternarycards2}
        >
          {theme.map((element, key) => (
            <View style={styles.quarternarycard2} key={key}>
              <Text style={styles.quarternarycardTitle2}>{element}</Text>
            </View>
          ))}
        </ScrollView>
        <Text style={styles.heading}>Tags</Text>
        <View
          horizontal
          // decelerationRate={0}
          // snapToInterval={100}
          snapToAlignment={"center"}
          style={styles.tags}
        >
          {data.tags &&
            data.tags.length > 0 &&
            data.tags.map((element, key) => (
              <View style={styles.tagcont} key={key}>
                <Text style={styles.tagname}>{element}</Text>
              </View>
            ))}
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
  icon2: {
    textAlign: "center",
    paddingTop: 1,
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
    paddingBottom: 8,
    color: "#838383",
    fontSize: 17,
    textAlign: "justify",
  },
  seemore: {
    color: "#00ADB5",
    textAlign: "right",
    marginBottom: 15,
  },
  seemore2: {
    color: "#00ADB5",
    textAlign: "left",
    marginBottom: 15,
  },
  seemorebutton: {
    textAlign: "center",
  },
  seemoreicon: {
    textAlign: "center",
    top: 3,
  },
  tertiarycards: {
    marginTop: 10,
    flex: 1,
  },
  tertiarycard: {
    backgroundColor: "#1c1c1c",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 100,
    width: 150,
    marginRight: 12,
  },
  heading: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "700",
    marginTop: 10,
  },
  reviewglass: {
    height: 155,
    // aspectRatio: 1,
    alignSelf: "center",
    opacity: 0.95,
    marginVertical: 10,
  },
  reviewrow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  text: {
    fontSize: 17,
    color: "#7a7a7a",
  },
  textTitle: {
    color: "#fff",
    fontSize: 17,
  },
  nameTitle: {
    fontSize: 30,
    color: "#efefef",
    marginTop: 10,
    marginBottom: 30,
    textTransform: "capitalize",
  },
  settingRight: {
    alignItems: "flex-end",
    paddingLeft: 20,
  },
  settingLeft: {
    alignItems: "flex-start",
    paddingRight: 20,
  },
  ticketglass: {
    height: 54,
    // aspectRatio: 1,
    alignSelf: "center",
    opacity: 0.95,
    top: 15,
  },
  ticketText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
    top: -23,
  },
  tertiarycards2: {
    marginBottom: 10,
    marginTop: 5,
    flex: 1,
  },
  tertiarycard2: {
    backgroundColor: "#1c1c1c",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 175,
    width: 175,
    marginRight: 12,
    marginTop: 5,
  },
  tertiarycardTitle2: {
    color: "#fff",
    textAlign: "center",
    fontWeight: 400,
    fontSize: 20,
  },
  quarternarycards2: {
    marginBottom: 10,
    marginTop: 5,
    flex: 1,
  },
  quarternarycard2: {
    backgroundColor: "#1c1c1c",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    height: 175,
    width: 300,
    marginRight: 12,
    marginTop: 5,
  },
  quarternarycardTitle2: {
    color: "#fff",
    textAlign: "center",
    fontWeight: 400,
    fontSize: 20,
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
    marginTop: 5,
  },
  tagname: {
    color: "#fff",
    textAlign: "center",
    fontWeight: 400,
    fontSize: 15,
  },
});
