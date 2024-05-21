import { StyleSheet, Text, View } from "react-native";
import React from "react";

export const defineStrength = (strength) => {
  if (strength <= 2) {
    return { label: "Weak", style: styles.barActiveRed };
  } else if (strength > 2 && strength <= 4) {
    return { label: "Moderate", style: styles.barActiveYellow };
  } else {
    return { label: "Strong", style: styles.barActiveBlue };
  }
};

const PasswordStrength = ({ strength }) => {
  const { label, style } = defineStrength(strength);

  return (
    <View>
      <View style={styles.passwordStrengthContainer}>
        {[...Array(5)].map((_, index) => (
          <View key={index} style={[styles.bar, index < strength && style]} />
        ))}
      </View>
      <Text style={styles.strenghTextStyle}>{label}</Text>
    </View>
  );
};

export default PasswordStrength;

const styles = StyleSheet.create({
  passwordStrengthContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 5,
  },
  bar: {
    height: 6,
    flex: 1,
    backgroundColor: "lightgray",
    marginHorizontal: 2,
    borderRadius: 2,
  },
  barActiveRed: {
    backgroundColor: "red",
  },
  barActiveYellow: {
    backgroundColor: "green",
  },
  barActiveBlue: {
    backgroundColor: "#007FFF",
  },
  strenghTextStyle: {
    marginHorizontal: 20,
    fontWeight: "bold",
    fontSize: 16,
  },
});
