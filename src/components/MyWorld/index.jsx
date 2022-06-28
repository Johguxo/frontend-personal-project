import React, { useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from "react-native";

import { MaterialCommunityIcons } from '@expo/vector-icons';

const MyWorld = ({ navigation }) => {

  const world = { title: "Jupiter",
                  description: "Bienvenido a Jupiter, aqui encontraras mis listas especiales de todo lo que me gusta, además que conoceras muchas cosas nuevas, me gusta en general la ciencia ficción.",
                };
              
  const user = {  firstName: 'Johann Gustavo',
                  lastName: 'Gonzales Inca',
                  email:'jgonzalesi@gmail.com'
                };
  const listContainers = [
    { id:1,
      title: "Peliculas Favoritas",
      data: ['Iron Man 1', 'Avengers: Age of Ultron','Cap America 2', 'Black Panther']},
    { id:2,
      title: "Series Mayo-Junio",
      data: ['Stranger Things 4', 'Moon Knight','Ms Marvel', 'The Boys']},
    { id:3,
      title: "Peliculas Favoritas",
      data: ['Iron Man 1', 'Avengers: Age of Ultron','Cap America 2', 'Black Panther']},
    { id:4,
      title: "Series Mayo-Junio",
      data: ['Stranger Things 4', 'Moon Knight','Ms Marvel', 'The Boys']},
    { id:6,
      title: "Peliculas Favoritas",
      data: ['Iron Man 1', 'Avengers: Age of Ultron','Cap America 2', 'Black Panther']},
    { id:5,
      title: "Series Mayo-Junio",
      data: ['Stranger Things 4', 'Moon Knight','Ms Marvel', 'The Boys']},
    { id:7,
      title: "Series Mayo-Junio",
      data: ['Stranger Things 4', 'Moon Knight','Ms Marvel', 'The Boys']},
  ];

  const renderItem = ({item}) => (
    <View style={styles.containerList}>
      <View style={styles.containerListTitle}>
        <Text style={styles.containerTitle}>{item.title}</Text>
      </View>
      <FlatList
            data={item.data}
            renderItem={({ item }) => {return (<Text>{item}</Text>)}}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.title}>{world.title}</Text>
        <Text style={styles.subtitle}>De: {user.firstName}</Text>
        <View>
          <Text style={styles.description}>{world.description}</Text>
          <TouchableOpacity style={styles.edit_button} onPress={()=>navigation.navigate('Edit World')}>
            <MaterialCommunityIcons name={"pencil"}  size={20} color="white" />
          </TouchableOpacity>
        </View>
        <FlatList 
          style={styles.clubList}
          numColumns={2}
          data={listContainers}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.footer}>  
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Add List')}>
          <Text style={styles.button_text}>Add List</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: "#F9FBFC",
  },
  body: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: "xx-large",
    color: "cornflowerblue",
    marginTop: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: "large",
    color: "cornflowerblue",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    backgroundColor: 'white',
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
  },
  clubList:{
    flexWrap: "wrap",
    flexDirection: "row",
  },
  edit_button: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',

    alignItems:'center',
    justifyContent:'center',

    width:40,
    height:40,

    backgroundColor:'rgb(33, 150, 243)',
    borderRadius:50,

    position:'absolute',
    right: -13,
    bottom: -4,

  },
  button: {
    backgroundColor: "cornflowerblue",
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
    fontSize: "large",

  },
  containerList: {
    backgroundColor: 'white',
    width: '45%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    marginRight: 5,
  },
  containerTitle: {
    fontWeight: "bold",
    color:'black'
  }
});

export default MyWorld;
