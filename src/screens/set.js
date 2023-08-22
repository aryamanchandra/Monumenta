import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { auth, db } from "../../firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { collection, addDoc, arrayUnion } from "firebase/firestore";
import jsondata from "./monuments.json";

const Add = () => {
  const handleSignUp = async () => {
    for (let i = 0; i < 9; i++) {
      const city = jsondata[i].Location +"";
      const origin = jsondata[i].Origin +"";
      const monument = jsondata[i].Monument +"";
      const original = [city, origin, monument];
      const lowered = original.map((element) => element.toLowerCase());
      // console.log(lowered);
      const fetch = await updateDoc(doc(db, "Monuments", jsondata[i].Monument), {
        timing: jsondata[i].Timing,
        wheelchair: jsondata[i]["Wheelchair Accessible"],
        country: jsondata[i].City,
        pincode: jsondata[i].Pincode,
        metrostation: jsondata[i]["Metro Station"],
        entry: jsondata[i]["Entry Fee"],
        daysclosed: jsondata[i]["Days Closed"],
        photographycost: jsondata[i]["Days Closed"],
        height:jsondata[i]["Height (m)"],
        width:jsondata[i]["Width (m)"],
        area:jsondata[i]["Area (acre)"],
        designer:jsondata[i].Architect,
        origin:jsondata[i].Origin,
        date:jsondata[i]["Date of Building"],
        city: jsondata[i].Location,
      });
      lowered.forEach(tag => {
        updateDoc(doc(db, "Monuments", jsondata[i].Monument), {
        tags: arrayUnion(tag),
      })})
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={handleSignUp}>
        <View style={styles.some}>
          <Text>Hello world</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({
  some: {
    padding: 20,
    margin: 30,
    backgroundColor: "#000",
    color: "#fff",
  },
});