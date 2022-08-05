import React, { useContext } from "react";
import { useState, 
  useEffect 
} from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/actions/authActions";
import { updateWorld } from "../../../redux/actions/worldActions";

import CustomInput from "../../CustomInput";

const EditWorldScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const worldState = useSelector(state => state.world);
  const [form, setForm] = useState({
    name: worldState.world.name,
    description: worldState.world.description,
  });

  const pressSaveWorld = () => {
    dispatch(
      updateWorld({
        id: worldState.world._id,
        name: form.name,
        description: form.description,
      })
    );
    navigation.goBack();
  };

  useEffect(() => {
    if (worldState.error) {
      if (worldState.errorResponse.status == 401) {
        ToastAndroid.show(
          `Error: ${worldState.errorResponse.statusText}`,
          ToastAndroid.LONG
        );
        dispatch(logout());
      }
    }
  }, [worldState]);

  return (
    <View style={styles.container}>
      <CustomInput
        placeholder="Name"
        value={form.name}
        onChangeText={(value) => setForm({ ...form, name: value })}
      />
      <CustomInput
        placeholder="Description"
        value={form.description}
        textBox={true}
        multiline={true}
        onChangeText={(value) => setForm({ ...form, description: value })}
      />
      <TouchableOpacity onPress={pressSaveWorld}>
        <View
          style={{
            ...styles.button,
            backgroundColor: worldState.isFetching
              ? "rgb(130, 193, 243)"
              : "rgb(33, 150, 243)",
          }}
        >
          {worldState.isFetching && (
            <ActivityIndicator size="large" color="yellow" />
          )}
          <Text style={styles.buttonText}>
            {worldState.isFetching ? "Loading..." : "Save"}
          </Text>
        </View>
      </TouchableOpacity>
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
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 40,
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default EditWorldScreen;
