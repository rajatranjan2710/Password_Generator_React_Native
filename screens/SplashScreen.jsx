import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import React from "react";
import security from "../assets/lock2.png";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();

  const navigateToHome = () => {
    navigation.replace("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={security}
          style={{ objectFit: "contain", height: "100%", width: "100%" }}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.features}>
          <View>
            <MaterialIcons name="lock-outline" size={28} color="black" />
          </View>
          <View>
            <Text
              style={{ fontWeight: "600", marginVertical: 2, fontSize: 16 }}
            >
              Secure and Random Passwords
            </Text>
            <Text style={{ width: 300 }}>
              Generate strong, random passwords to enhance your online security.
            </Text>
          </View>
        </View>
        <View
          style={[
            { flexDirection: "row", alignItems: "center" },
            styles.features,
          ]}
        >
          <Feather name="tool" size={28} color="black" />
          <View>
            <Text style={{ fontWeight: "600", fontSize: 16 }}>
              Customizable Options
            </Text>
            <Text style={{ width: 300 }}>
              Tailor your passwords with various options like length,
              characters, and symbols.
            </Text>
          </View>
        </View>
        <View
          style={[
            { flexDirection: "row", alignItems: "center" },
            styles.features,
          ]}
        >
          <AntDesign name="staro" size={28} color="black" />
          <View
            style={{
              paddingRight: 10,
              width: "90%",
              paddingRight: 10,
              //   backgroundColor: "blue",
            }}
          >
            <Text style={{ fontWeight: "600", fontSize: 16 }}>
              User-Friendly Interface
            </Text>
            <Text>
              Enjoy a seamless experience with our intuitive and easy-to-use
              interface.
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          marginTop: 60,
          // borderWidth: 1,
          padding: 10,
          paddingHorizontal: 20,
          borderRadius: 10,
          backgroundColor: "#007FFF",
          elevation: 3,
        }}
      >
        <TouchableOpacity onPress={navigateToHome}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 80,
  },

  imageContainer: {
    width: 200,
    height: 200,
  },
  contentContainer: {
    marginTop: 70,

    alignItems: "center",
    // justifyContent: "flex-start",
    gap: 15,
    width: "100%",
    // backgroundColor: "red",
    paddingHorizontal: 15,
  },
  features: {
    width: "100%",
    flexDirection: "row",

    alignItems: "center",

    padding: 10,
    gap: 10,

    // backgroundColor: "blue",
  },
});
