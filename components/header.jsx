import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>CatchUp</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingTop: 30,
    backgroundColor: "lightblue",
  },
  title: {
    textAlign: "center",
    color: "beige",
    fontSize: 20,
    fontWeight: "bold",
  },
});
