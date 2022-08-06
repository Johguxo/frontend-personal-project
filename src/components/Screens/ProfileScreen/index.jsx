import React, { useState, useRef, createRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";

import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import CustomButton from "../../CustomButton";

import { logout, updateProfile } from "../../../redux/actions/authActions";
import CustomInput from "../../CustomInput";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const [image, setImage] = useState(authState.user.image);
  const [form, setForm] = useState({
    firstName: authState.user.firstName,
    lastName: authState.user.lastName,
  });

  const sheetRef = createRef();
  const fall = new Animated.Value(1);

  const choosePhotoFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    sheetRef.current.snapTo(1);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const takePhotoFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    sheetRef.current.snapTo(1);
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const RenderInner = () => {
    return (
      <View style={styles.panel}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.panelTitle}>Upload Photo</Text>
          <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
        </View>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={takePhotoFromCamera}
        >
          <Text style={styles.panelButtonTitle}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={choosePhotoFromLibrary}
        >
          <Text style={styles.panelButtonTitle}>Choose From Library</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={() => {
            sheetRef.current.snapTo(1);
          }}
        >
          <Text style={styles.panelButtonTitle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const RenderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const handleUpdate = () => {
    if (image === authState.user.image) {
      dispatch(
        updateProfile({
          id: authState.user._id,
          firstName: form.firstName,
          lastName: form.lastName,
        })
      );
    } else {
      dispatch(
        updateProfile({
          uri: image,
          id: authState.user._id,
          firstName: form.firstName,
          lastName: form.lastName,
        })
      );
    }

    /*Alert.alert(
        "Perfil Actualizado",
        "El perfil se actualizo con exito",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );*/
  };

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[330, 0]}
        renderContent={RenderInner}
        renderHeader={RenderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}
      >
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => sheetRef.current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={{
                  uri: image,
                }}
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 15 }}
              ></ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
            {authState.user.firstName} {authState.user.lastName}
          </Text>
          <CustomInput
            icon="person"
            placeholder="First name"
            name="firstName"
            value={form.firstName}
            onChangeText={(value) => setForm({ ...form, firstName: value })}
          />
          <CustomInput
            icon="person"
            placeholder="Last name"
            name="lastName"
            value={form.lastName}
            onChangeText={(value) => setForm({ ...form, lastName: value })}
          />
        </View>
        <TouchableOpacity onPress={handleUpdate}>
          <View
            style={{
              ...styles.button,
              backgroundColor: authState.isFetching
                ? "rgb(130, 193, 243)"
                : "rgb(33, 150, 243)",
            }}
          >
            {authState.isFetching && (
              <ActivityIndicator size="large" color="yellow" />
            )}
            <Text style={styles.buttonText}>
              {authState.isFetching ? "Loading..." : "Save"}
            </Text>
          </View>
        </TouchableOpacity>
          <CustomButton
            text="Log Out"
            type="DANGER"
            onPress={() => dispatch(logout())}
          />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FBFC",
  },
  pic: {
    width: 80,
    height: 80,
    borderRadius: 21,
    alignSelf: "center",
    marginBottom: 20,
  },
  uploadButton: {
    borderRadius: 16,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 7,
      height: 5,
    },
    shadowOpacity: 1.58,
    shadowRadius: 9,
    elevation: 4,
    margin: 10,
    padding: 10,
    backgroundColor: "#fe5b29",
    alignItems: "center",
  },
  uploadButtonText: {
    color: "#f6f5f8",
    fontSize: 20,
    fontFamily: "Roboto",
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
    color: "cornflowerblue",
    marginBottom: 35,
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    
    height: 40,
    marginTop: 10,
    marginBottom: 10,

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

export default ProfileScreen;
