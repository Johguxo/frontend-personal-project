import React, { useState, useEffect } from "react";
import { createRef } from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  Modal
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addItemFav, updateItemFav } from "../../../redux/actions/favsActions";
import CustomIndicator from "../../CustomIndicator";

const EditListScreen = ({ route, navigation }) => {
  
  const favInitialItem = route.params;
  const [favItem, setFavItem] = useState(favInitialItem);
  
  const dispatch = useDispatch();
  const favsState = useSelector((state) => state.favs);

  useEffect(() => {
    for(let i = 0; i < favsState.favs.length; i++){
      if(favsState.favs[i]._id === favInitialItem._id){
        setFavItem(favsState.favs[i]);
      }
    }
  }, [favsState])

  const initial_data = {
    title: '',
    description: '',
    link: ''
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [favorite, setFavorite] = useState(initial_data);
  const [selectFavorite, setSelectFavorite] = useState(false);

  
  const pressFavorite = (fav=null) => {
    if (!fav)  { 
      setFavorite(initial_data);
      setSelectFavorite(false);
    } else {
      setFavorite(fav);
      setSelectFavorite(true);
    }
    setModalVisible(true);
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => { pressFavorite(item) }}>
      <View style={styles.containerList}>
        <Text style={styles.labelText}>Title: </Text>
        <Text>{item.title}</Text>
        <Text style={styles.labelText}>Description: </Text>
        <Text>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const RenderModal = ({initialItem}) => {

    const [item, setItem] = useState(initialItem);

    const handleSubmit = () => {
      if (!selectFavorite) {
        dispatch(addItemFav(favItem._id, item));
      } else {
        dispatch(updateItemFav(favItem._id, item));
      }
      setModalVisible(!modalVisible)
    }
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        >
        <TouchableOpacity style={styles.centeredView}  activeOpacity={1}  onPressOut={() => {setModalVisible(false)}}>
            <View style={styles.modalView}>
              <Text style={[{paddingBottom: 5},styles.labelText]}>Title: </Text>
              <TextInput
                style={styles.inputText}
                //onChangeText={(text) => setFavorite({...favorite, title: text})}
                onChangeText={(text) => setItem({...item, title: text})}
                value={item.title}
              />
              <Text style={[{paddingBottom: 5},styles.labelText]}>Description: </Text>
              <TextInput
                style={styles.inputText}
                onChangeText={(text) => setItem({...item, description: text})}
                value={item.description}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleSubmit}
                disabled={item.title === '' || item.description === ''}
                >
                { selectFavorite ? 
                <Text style={styles.textStyle}>Editar</Text>
                : <Text style={styles.textStyle}>Crear</Text> }
              </Pressable>
            </View>
        </TouchableOpacity >
      </Modal>
    )
  };

  return (
    <View style={styles.container}>
      <RenderModal initialItem={favorite}/>
      <Text style={styles.title}>{favItem.name}</Text>
      { favsState.isFetching ? (
        <CustomIndicator /> ):(
        <FlatList
          data={favItem.list}
          renderItem={renderItem}
          keyExtractor={(item, index) => `_key${index.toString()}`}
          removeClippedSubviews={true}
        />
      )}
      <Button style={styles.buttonOpen} title="Agregar" onPress={()=>{ pressFavorite() }}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#F9FBFC",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "cornflowerblue",
    marginTop: 5,
    marginBottom: 10,
  },
  containerList: {
    backgroundColor: "white",
    width: "100%",

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
    marginRight: 5,
  },
  containerTitle: {
    fontWeight: "bold",
    color: "black",
  },
  labelText: {
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#F9FBFC",
    width: 300,
    
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 20,

    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  buttonOpen: {
    display: "flex",
    height: 40,

    borderRadius: 10,
    paddingBottom: 20,

    fontWeight: 'bold',
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  inputText: {
    padding: 10,
    height:50,
    width: 200,

    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,

    marginBottom: 15,
  }
});

export default EditListScreen;
