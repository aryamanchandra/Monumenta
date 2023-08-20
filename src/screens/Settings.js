import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { signOut, updateEmail } from "firebase/auth";
import { Switch } from "react-native-switch";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";

const Settings = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const changePassword = () => {
    sendPasswordResetEmail(auth.currentUser.email)
      .then(() => {
        alert("Password reset email sent.");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const changeEmail = (emailid) => {
    updateEmail(auth.currentUser.email, emailid)
      .then(() => {
        alert("Email updated.");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  const [data, setData] = useState("");
  const [email, setEmail] = useState("");
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
          setData(data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [user]);

  const handlePast = (element) => {
    navigation.navigate("Trip", { element });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.title}>Settings</Text> */}
        <Image
          source={require("../assets/profile.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.nameTitle}>{data.firstname}</Text>
      </View>
      <Text style={styles.subTitle}>User Profile</Text>
      <View>
        <View style={styles.row}>
          {/* <Text style={styles.settingLeft}>{auth.currentUser?.name}</Text> */}
          <View style={styles.settingLeft}>
            <Text style={styles.textTitle}>Email</Text>
          </View>
          <View style={styles.settingRight}>
            <Text style={styles.text}>{auth.currentUser?.email}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.settingLeft}>
            <Text style={styles.textTitle}>Password</Text>
          </View>
          <View style={styles.settingRight}>
            <TouchableOpacity onPress={changePassword}>
              <Text style={[styles.text, styles.forgot]}>Change Password</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.subTitle}>Past Visits</Text>
        <TouchableOpacity
          style={styles.card}
          // key={key}
          onPress={() => handlePast()}
        >
          <Text style={styles.cardTitle}>Hello</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignOut}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 5,
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
    // marginBottom: 30,
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
  container: {
    flex: 1,
    paddingHorizontal: 40,
    backgroundColor: "#000",
    // alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginTop: 80,
  },
  title: {
    fontSize: 40,
    fontWeight: 700,
    color: "#F8F8F8",
    marginTop: 80,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 20,
    marginTop: 50,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 20,
    borderColor: "#",
    borderWidth: 1,
  },
  subTitle: {
    color: "#00ADB5",
    fontWeight: 400,
    fontSize: 22,
    marginTop: 28,
    paddingLeft: 3,
    paddingBottom: 15,
    textAlign: "left",
  },
  forgot: {
    paddingLeft: 20,
    textAlign: "left",
    color: "#00ADB5",
  },
  buttonContainer: {
    flex:1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#fff",
    width: "80%",
    paddingVertical: 15,
    borderRadius: 30,
    color: "#111",
  },
  card: {
    backgroundColor: "#1c1c1c",
    paddingVertical: 20,
    // paddingHorizontal: 10,
    borderRadius: 20,
    height: 175,
    width: "100%",
    marginRight: 12,
  },
  cardTitle: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "400",
    fontSize: 20,
  },
  buttonOutline: {
    backgroundColor: "#fff",
    marginTop: 5,
    // borderColor:"#1c1c1c",
    // borderWidth:2,
  },
  buttonText: {
    color: "#111",
    // fontWeight:"700",
    fontSize: 16,
    textAlign: "center",
  },
  buttonOutlineText: {
    color: "#111",
    // fontWeight:"700",
    fontSize: 16,
    textAlign: "center",
  },
  text: {
    color: "#E2E2E2",
  },
  inputcontainer: {
    height: 65,
    position: "relative",
    marginTop: 10,
  },
  labelContainer: {
    position: "absolute",
    backgroundColor: "#000",
    top: -10,
    left: 25,
    padding: 5,
    zIndex: 50,
  },
  label: {
    color: "#B0B0B0",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 25,
    paddingVertical: 0,
    margin: 5,
    borderRadius: 30,
    borderColor: "#B0B0B0",
    color: "#fff",
  },
  image: {
    height: 100,
    aspectRatio: 1,
    borderRadius: 60,
    marginTop: 20,
  },
});
