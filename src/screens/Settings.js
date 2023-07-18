import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
} from "react-native";
import React from "react";
import { auth } from "../../firebase";
import { signOut, updateEmail } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";




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

  const [startCamera,setStartCamera] = React.useState(false)

  const __startCamera = ()=>{

  }

  // const [cameraRollPer, setCameraRollPer] = useState(null);
  // const [disableButton, setDisableButton] = useState(false);

  // useEffect(() => {
  //   const requestPermissions = async () => {
  //     const { status } =
  //       await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     setCameraRollPer(status === "granted");
  //     setDisableButton(false);
  //   };
  //   requestPermissions();
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View>
        <View style={styles.row}>
          <View style={styles.settingLeft}>
            <Text style={styles.textTitle}>Name</Text>
          </View>
          <View style={styles.settingRight}>
            <Text style={styles.text}>Aryaman</Text>
          </View>
        </View>
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
              <Text style={[styles.forgot, styles.text]}>
                Change Password
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* <View style={styles.buttonContainer}>
            {cameraRollPer ? (
              <TouchableOpacity
                title="Pick From Gallery"
                disabled={disableButton}
                style={styles.button}
                onPress={console.log("permission granted")}
              >
                <Text style={styles.buttonText}>Grant Permission</Text>
              </TouchableOpacity>
            ) : (
              <Text>Camera Roll Permission Required ! </Text>
            )}
      </View> */}
      
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
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent:"center",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop:20,
  },
  text: {
    fontSize:17,
    color:"#7a7a7a",
  },
  textTitle: {
    color:"#1c1c1c",
    fontSize:17,
  },
  title: {
    fontSize: 40,
    fontWeight: 700,
    marginTop: 40,
    marginBottom:30,
  },
  settingRight: {
    alignItems: "flex-end",
    paddingLeft:20,
  },
  settingLeft: {
    alignItems: "flex-start",
    paddingRight:20,
  },
  buttonContainer: {
    width: "55%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  forgot: {
    textDecorationLine:"underline"
  },
  button: {
    backgroundColor: "#C0C0C0",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonOutline: {
    backgroundColor: "#1c1c1c",
    marginTop: 5,
    // borderColor:"#1c1c1c",
    // borderWidth:2,
  },
  buttonText: {
    color: "#1c1c1c",
    // fontWeight:"700",
    fontSize: 16,
    textAlign: "center",
  },
  buttonOutlineText: {
    color: "white",
    // fontWeight:"700",
    fontSize: 16,
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  title: {
    fontSize: 40,
    fontWeight: 700,
    color: "#F8F8F8",
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
  forgot: {
    fontStyle: "italic",
    paddingLeft: 20,
    paddingTop: 10,
    textAlign: "left",
    color: "#00ADB5",
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#fff",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 30,
    color: "#111",
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
});
