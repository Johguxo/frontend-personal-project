import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";

import Earth from "../../assets/earth.gif";

const CustomWorld = ({ title, subtitle, size, titleSize }) => {
  const stylesTitle = [
    styles.title,
    titleSize == 'large' && styles.titleLarge,
  ]
  return (
    <View style={styles.container}>
      <Image source={Earth} style={{ width:size, height:size }} />
      <Text style={stylesTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    textAlign: "center",
    alignItems: "center",

    paddingVertical: 10,
    marginVertical: 10,
  },
  container_PRIMARY: {
    backgroundColor: "rgb(33, 150, 243)",
  },
  container_TERTIARY: {},
  text: {
    fontWeight: "bold",
  },
  text_PRIMARY: {
    textTransform: "uppercase",
    color: "white",
  },
  text_TERTIARY: {
    color: "grey",
  },
  title: {
    backgroundColor: "white",
    width: "60%",

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,

    position: "absolute",
    top: "35%",

    fontWeight: "bold",
    fontSize: 18,
    color: "cornflowerblue",
    textAlign: "center",
  },
  titleLarge: {
    fontSize: 10,
  },
  subtitle: {},
});

export default CustomWorld;
