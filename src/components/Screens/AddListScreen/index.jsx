import React, { useContext, useState } from "react";
import { Text, View, Button, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createFav } from "../../../redux/actions/favsActions";
import CustomInput from "../../CustomInput";

const AddListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const favsState = useSelector((state) => state.favs);

  const initial_form = {
    name: "",
  };
  const [form, setForm] = useState(initial_form);

  const submitListFavs = () => {
    dispatch(createFav(form));
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <CustomInput
        placeholder="Name"
        value={form.name}
        onChangeText={(value) => setForm({ ...form, name: value })}
      />
      <Button
        title="Add"
        onPress={submitListFavs}
        disabled={form.name === ""}
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
});

export default AddListScreen;
