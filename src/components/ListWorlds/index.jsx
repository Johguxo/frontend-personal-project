import React, { useContext, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import CustomSearchBar from "../CustomSearchBar";
import CustomWorld from "../CustomWorld";

const ListWorlds = ({ navigation }) => {

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  const listContainers = [
    {id:1, title: "Marte" },
    {id:2, title: "Saturno" },
    {id:3, title: "Urano" },
    {id:4, title: "Neptuno" },
    {id:5, title: "Pluton" },
    {id:6, title: "Tierra" },
    {id:8, title: "Venus" },
    {id:10, title: "Triton" },
  ];
  const renderItem = ({ item }) => (
    <CustomWorld title={item.title} subtitle="Johann Gonzales" size={150} titleSize='large' />
  );

  return (
    <View style={styles.container}>
      <CustomSearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      <FlatList
        style={styles.clubList}
        numColumns={2}
        data={listContainers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#F9FBFC",
  },
  pic: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignSelf: "flex-end",
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
    color: "cornflowerblue",
    marginBottom: 35,
    marginTop: 10,
  },
  clubList: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
});

export default ListWorlds;
