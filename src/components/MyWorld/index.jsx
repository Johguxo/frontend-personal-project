import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFavs } from "../../redux/actions/favsActions";
import CustomIndicator from "../CustomIndicator";

const MyWorld = ({ navigation }) => {
  const dispatch = useDispatch();
  const worldState = useSelector((state) => state.world);
  const authState = useSelector((state) => state.auth);
  const favsState = useSelector((state) => state.favs);

  useEffect(() => {
    dispatch(loadFavs(authState.user._id));
  }, []);

  const listContainers = [
    {
      id: 1,
      title: "Peliculas Favoritas",
      data: [
        "Iron Man 1",
        "Avengers: Age of Ultron",
        "Cap America 2",
        "Black Panther",
      ],
    },
    {
      id: 2,
      title: "Series Mayo-Junio",
      data: ["Stranger Things 4", "Moon Knight", "Ms Marvel", "The Boys"],
    },
    {
      id: 3,
      title: "Peliculas Favoritas",
      data: [
        "Iron Man 1",
        "Avengers: Age of Ultron",
        "Cap America 2",
        "Black Panther",
      ],
    },
    {
      id: 4,
      title: "Series Mayo-Junio",
      data: ["Stranger Things 4", "Moon Knight", "Ms Marvel", "The Boys"],
    },
    {
      id: 6,
      title: "Peliculas Favoritas",
      data: [
        "Iron Man 1",
        "Avengers: Age of Ultron",
        "Cap America 2",
        "Black Panther",
      ],
    },
    {
      id: 5,
      title: "Series Mayo-Junio",
      data: ["Stranger Things 4", "Moon Knight", "Ms Marvel", "The Boys"],
    },
    {
      id: 7,
      title: "Series Mayo-Junio",
      data: ["Stranger Things 4", "Moon Knight", "Ms Marvel", "The Boys"],
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Edit List", item)}
      style={styles.containerBox}
    >
      <View style={styles.containerList}>
        <View style={styles.containerListTitle}>
          <Text style={styles.containerTitle}>{item.name}</Text>
        </View>
        <FlatList
          data={item.list}
          renderItem={({ item }) => {
            return <Text>{item.title}</Text>;
          }}
          listKey={(item, index) => `_key${index.toString()}`}
          keyExtractor={(item, index) => `_key${index.toString()}`}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.title}>{worldState.world.name}</Text>
        <Text style={styles.subtitle}>
          De: {authState.user.firstName} {authState.user.lastName}
        </Text>
        <View>
          <Text style={styles.description}>{worldState.world.description}</Text>
          <TouchableOpacity
            style={styles.edit_button}
            onPress={() => navigation.navigate("Edit World")}
          >
            <MaterialCommunityIcons name={"pencil"} size={20} color="white" />
          </TouchableOpacity>
        </View>
        {favsState.favs.length == 0 ? (
          <Text style={styles.textDefault}>No hay lista de favoritos</Text>
        ) : (
          <FlatList
            numColumns={2}
            data={favsState.favs}
            renderItem={renderItem}
            listKey={(item) => item._id}
          />
        )}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Add List")}
        >
          <Text style={styles.button_text}>Add List</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#F9FBFC",
  },
  body: {
    flex: 1,
  },
  textDefault: {
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    color: "cornflowerblue",
    marginTop: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "cornflowerblue",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    backgroundColor: "white",
    width: "100%",

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    fontSize: 15,

    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
  },
  clubList: {
    //flexWrap: "wrap",
    flexDirection: "row",
  },
  edit_button: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",

    alignItems: "center",
    justifyContent: "center",

    width: 40,
    height: 40,

    backgroundColor: "rgb(33, 150, 243)",
    borderRadius: 50,

    position: "absolute",
    right: -13,
    bottom: -4,
  },
  button: {
    backgroundColor: "rgb(33, 150, 243)",
    borderRadius: 20,

    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 5,

    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  button_text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  containerList: {
    backgroundColor: "white",
    width: "90%",

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    marginRight: 5,
  },
  containerBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerTitle: {
    fontWeight: "bold",
    color: "black",
  },
});

export default MyWorld;
