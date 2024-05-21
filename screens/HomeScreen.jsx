import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import * as Yup from "yup";
import * as clipboard from "expo-clipboard";

//icons
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

import PasswordStrength, {
  defineStrength,
} from "../components/PasswordStrength";

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(5, "Password should be min of 5 Characters")
    .max(16, "Password should be max of 16 Characters")
    .required("Length field is required"),
});

const HomeScreen = () => {
  const [strength, setStrength] = useState(null);
  const [password, setPassword] = useState("");
  // const [passwordLength, setPassword] = useState("");

  const [passwordLength, setPasswordLength] = useState("");
  const [isLowerEnabled, setLowerEnabled] = useState(true);
  const [isUpperEnabled, setUpperEnabled] = useState(false);
  const [isDigitsEnabled, setDigitsEnabled] = useState(false);
  const [isSpecialEnabled, setSpecialnabled] = useState(false);
  const [isCopied, setCopied] = useState(false);

  const generatePasswordString = (passwordLength) => {
    const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digits = "0123456789";
    const specialChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let characterList = "";
    if (isLowerEnabled) characterList += lowerCaseLetters;
    if (isUpperEnabled) characterList += upperCaseLetters;
    if (isDigitsEnabled) characterList += digits;
    if (isSpecialEnabled) characterList += specialChars;

    const result = createPassword(characterList, passwordLength);
    const strength = calculateStrength(result);
    setStrength(strength);
    setPassword(result);
  };

  const createPassword = (char, passwordLength) => {
    let result = "";
    for (let i = 0; i < passwordLength; i++) {
      let CharacterIndex = Math.floor(Math.random() * char.length);
      result += char.charAt(CharacterIndex);
    }
    return result;
  };

  const calculateStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.match(/[A-Z]/)) score += 1;
    if (password.match(/[0-9]/)) score += 1;
    if (password.match(/[^A-Za-z0-9]/)) score += 1;
    if (password.length >= 12) score += 1;
    return score;
  };

  const toggleSwitch = (type) => {
    switch (type) {
      case "lower":
        setLowerEnabled((previousState) => !previousState);
        break;
      case "upper":
        setUpperEnabled((previousState) => !previousState);
        break;
      case "digits":
        setDigitsEnabled((previousState) => !previousState);
        break;
      case "special":
        setSpecialnabled((previousState) => !previousState);
        break;
      default:
        break;
    }
  };

  const copyToClipboard = async () => {
    await clipboard.setStringAsync(password);
    setCopied(true);
    // Alert.alert(
    //   "Copied to Clipboard",
    //   "Password has been copied to clipboard."
    // );

    const showToast = () => {
      console.log("working");
      Toast.show({
        type: "success",
        text1: "Coppied to clipboard❤",
        text2: `${defineStrength(strength).label} password`,
        text2Style: { fontWeight: "600" },
        position: "bottom",
      });
    };
    showToast();

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const resetFields = () => {
    setPassword("");
    setLowerEnabled(true);
    setUpperEnabled(false);
    setDigitsEnabled(false);
    setSpecialnabled(false);
    setPasswordLength("");
    setStrength(null);
  };

  return (
    <View style={styles.Container}>
      <View style={styles.header}>
        <Text style={styles.headingText}>Password Generator</Text>
      </View>

      {/* password area  */}
      <View style={styles.passwordArea}>
        <View style={styles.password}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text
              style={[
                {
                  fontSize: 16,
                  fontWeight: "600",
                  alignSelf: "flex-start",
                },
                isCopied && styles.copiedText,
              ]}
            >
              {password}
            </Text>
          </View>

          <TouchableOpacity style={styles.touchable} onPress={copyToClipboard}>
            <Feather name="copy" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchable}>
            <Feather name="edit" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* password strength component  */}
      <View style={styles.passwordStrength}>
        {/* i wanna show password strent using blue bars here  */}
        <PasswordStrength strength={strength} />
      </View>

      {/* //generateButton */}
      <View style={styles.generateButton}>
        <TouchableOpacity
          style={styles.generateTouchable}
          onPress={() => generatePasswordString(passwordLength)}
        >
          <AntDesign name="rocket1" size={28} color="white" />
          <Text style={styles.generateText}>Generate Password</Text>
        </TouchableOpacity>
      </View>

      {/* customization area*/}
      <View style={styles.custom}>
        <TouchableOpacity
          style={{
            // backgroundColor: "red",
            flexDirection: "row",
            alignSelf: "flex-end",
            alignItems: "center",
          }}
          onPress={resetFields}
        >
          <EvilIcons name="undo" size={30} color="black" />
          <Text style={{ fontSize: 18, fontWeight: "500" }}>Reset</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "500" }}>Length</Text>
          <TextInput
            placeholder="Enter Length"
            value={passwordLength}
            onChangeText={(txt) => setPasswordLength(txt)}
            style={{ fontSize: 17, fontWeight: "500" }}
          />
        </View>

        <View style={{ padding: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.customText}>Lower Case Letters</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isLowerEnabled ? "#007FFF" : "#f4f3f4"}
              onValueChange={() => toggleSwitch("lower")}
              value={isLowerEnabled}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.customText}>Upper case Letters</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isUpperEnabled ? "#007FFF" : "#f4f3f4"}
              onValueChange={() => toggleSwitch("upper")}
              value={isUpperEnabled}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.customText}>Include Digits</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isDigitsEnabled ? "#007FFF" : "#f4f3f4"}
              onValueChange={() => toggleSwitch("digits")}
              value={isDigitsEnabled}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.customText}>Special Characters</Text>
            <Switch
              trackColor={{ false: "#767577", true: "red" }}
              thumbColor={isSpecialEnabled ? "red" : "#f4f3f4"}
              onValueChange={() => toggleSwitch("special")}
              value={isSpecialEnabled}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  Container: {
    marginTop: 40,
    padding: 15,
  },
  header: {
    padding: 10,
    width: "100%",
    // backgroundColor: "lime",
    marginBottom: 15,
  },
  headingText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "sans-serif",
    color: "#007FFF",
  },
  passwordArea: {
    // height: 180,
    padding: 20,
    flexDirection: "row",
    // backgroundColor: "red",
  },
  password: {
    backgroundColor: "#FAFAFA",
    height: 70,
    width: "100%",
    flexDirection: "row",

    alignItems: "center",
    padding: 15,
    justifyContent: "center",
    // backgroundColor: "blue",
    marginBottom: 10,
  },
  buttonsView: {
    flexDirection: "row",
    gap: 10,
    // backgroundColor: "yellow",
    flex: 1,
    alignItems: "center",
  },
  touchable: {
    marginHorizontal: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  passwordStrength: {},
  generateButton: {
    marginTop: 25,
    margin: 20,
    height: 70,
    // backgroundColor: "#007FFF",
  },
  generateTouchable: {
    flexDirection: "row",
    backgroundColor: "#007FFF",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    gap: 7,
  },
  generateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  custom: {
    paddingHorizontal: 25,
    gap: 15,
  },
  customText: { fontSize: 17, fontWeight: "500", flex: 1 },
  copiedText: {
    color: "blue", // Highlight color for copied text
    backgroundColor: "lightblue",
  },
});
