import React, {useContext, useState, createRef } from 'react'
import { AppState, Text, View, Button, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native'

import { AppContext } from '../../../contexts/AppContext'
import { AuthContext } from '../../../contexts/AuthContext'

import { logoutSuccess } from '../../../hooks/auth/ApiCalls'

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ProfileScreen = ({navigation}) => {

    const { dispatch } = useContext(AuthContext)
    const { state, updateUser } = useContext(AppContext)

    const [image, setImage] = useState('https://res.cloudinary.com/ogcodes/image/upload/v1581387688/m0e7y6s5zkktpceh2moq.jpg');
    console.log("1")
    const bs = createRef();
    console.log("2")
    const fall = new Animated.Value(1);
    console.log("3")

    const choosePhotoFromLibrary = async  () => {
        // No permissions request is necessary for launching the image library
        
        bs.current.snapTo(1);
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.cancelled) {
            console.log(result)
            setImage(result.uri);
            console.log(bs)
            //bs.current.snapTo(1);
        }
    }

    const takePhotoFromCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);
        if (!result.cancelled) {
            console.log(result)
            setImage(result.uri);
            //bs.current.snapTo(1);
        }
    }

    const renderInner = () => (
        <View style={styles.panel}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.panelTitle}>Upload Photo</Text>
            <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
          </View>
          <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
            <Text style={styles.panelButtonTitle}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
            <Text style={styles.panelButtonTitle}>Choose From Library</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={() => {console.log(bs); bs.current.snapTo(1)}}>
            <Text style={styles.panelButtonTitle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      );
    
    const renderHeader = () => (
        <View style={styles.header}>
          <View style={styles.panelHeader}>
            <View style={styles.panelHandle} />
          </View>
        </View>
      );

    const handleUpdate = () => {
      updateUser({
        uri: image,
        firstName: state.user.firstName,
        lastName: state.user.lastName,
      })
    }

    return (
        <View style={styles.container}>
            <BottomSheet
                ref={bs}
                snapPoints={[330, 0]}
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
            />
            <Animated.View style={{
              margin: 20,
              opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
            }}>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
                        <View
                            style={{
                                height: 100,
                                width: 100,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <ImageBackground
                                source={{
                                uri: image,
                                }}
                                style={{height: 100, width: 100}}
                                imageStyle={{borderRadius: 15}}>
                                <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <MaterialCommunityIcons
                                    name="camera"
                                    size={35}
                                    color="#fff"
                                    style={{
                                        opacity: 0.7,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderWidth: 1,
                                        borderColor: '#fff',
                                        borderRadius: 10,
                                    }}
                                />
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
                        {state.user.firstName} {state.user.lastName}
                    </Text>
                </View>

                <Button title='Save' onPress={handleUpdate}/>
                <View style={styles.logOutButton}>
                    <Button color='red' title='Log Out' onPress={()=>logoutSuccess(dispatch)} />
                </View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F9FBFC',
    },
    pic: {
        width: 80,
        height: 80,
        borderRadius: 21,
        alignSelf: 'center',
        marginBottom: 20,
    },
    uploadButton: {
        borderRadius: 16,
        alignSelf: 'center',
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
        backgroundColor: '#fe5b29',
        alignItems: 'center'
    },
    uploadButtonText: {
        color: '#f6f5f8',
        fontSize: 20,
        fontFamily: 'Roboto'
    },
    title: {
      fontWeight: 'bold',
      fontSize: 15,
      color: 'cornflowerblue',
      marginBottom: 35,
      marginTop: 10,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
      },
      header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      panelHeader: {
        alignItems: 'center',
      },
      panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
      },
      panelTitle: {
        fontSize: 27,
        height: 35,
      },
      panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
      },
      panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 7,
      },
      panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
      },
    logOutButton: {
        marginTop: 20,
    }
});

export default ProfileScreen