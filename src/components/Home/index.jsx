import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, {useContext,useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { 
  Text, 
  View, 
  StyleSheet, 
  Image, 
  TouchableOpacity,
  FlatList, 
  ToastAndroid
} from 'react-native'

import CustomWorld from '../CustomWorld';
import { loadWorld } from '../../redux/actions/worldActions';
import { loadLastNote } from '../../redux/actions/noteActions';
import { logout } from '../../redux/actions/authActions';
import CustomIndicator from '../CustomIndicator';

const Home = ({ navigation }) => {
  const worldState = useSelector(state => state.world)
  const authState = useSelector(state => state.auth)
  const noteState = useSelector(state => state.note)

  const dispatch = useDispatch();
  
  let worldName = 'Crear mi mundo';

  useEffect(()=> {
    dispatch(loadWorld(authState.user._id));
    dispatch(loadLastNote(authState.user._id));
  },[])

  useEffect(()=> {
    if(!worldState.error && worldState.world) {
      if (worldState.world) {
        worldName = worldState.world.name;
      }
    }
    if (worldState.error) {
      if (worldState.errorResponse.status == 401) {
        ToastAndroid.show(`Error: ${worldState.errorResponse.statusText}`, ToastAndroid.LONG);
        dispatch(logout());
      }
    }
  }, [worldState]);

  useEffect(()=> {
    if (noteState.error) {
      if (noteState.errorResponse.status == 401) {
        ToastAndroid.show(`Error: ${noteState.errorResponse.statusText}`, ToastAndroid.LONG);
        dispatch(logout());
      }
    }
  }, [noteState]);

  const goToNotification = () => {
    navigation.navigate("Notifications");
  }

  const goToChat = () => {
    navigation.navigate("Chat");
  }

  const goToProfile = () => {
    navigation.navigate("Profile");
  };

  const goToWorld = () => {
    if (!worldState.world) {
      navigation.navigate("NewWorld");
    } else {
      navigation.navigate('MyWorldStack')
    }
  }

  const LeftAlignedComponent = () => {
    return (
      <View style={styles.leftAlignedContainer}>
        <Text style={{fontWeight:'bold',fontSize: 20}}>{authState.user.firstName}</Text>
        {/*<TouchableOpacity 
          onPress={goToNotification} 
          style={styles.iconButtonContainer}>
          <MaterialCommunityIcons name="bell" size={26}/>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={goToChat} 
          style={styles.iconButtonContainer}>
          <MaterialCommunityIcons name="forum" size={26}/>
       </TouchableOpacity>*/}
      </View>
    )
  }

  const RightAlignedComponent = () => {
    return (
      <View style={styles.rightAlignedContainer}>
        <TouchableOpacity onPress={goToProfile}>
          {authState.user
          ?
          <Image
            source={{
              uri: authState.user.image,
            }}
            style={styles.pic}
          />
          :<Image
            source={{
              uri: 'https://res.cloudinary.com/johguxo-gonzales/image/upload/v1656618838/nauta_ledvrn.png',
            }}
            style={styles.pic}
          />}
          
        </TouchableOpacity>
      </View>
    )
  }
  

  const dateFormat = () => {
    const dateFormatted = new Date();
    const day = dateFormatted.getDate();
    const month = dateFormatted.getMonth() + 1;
    const year = dateFormatted.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const nowDate = dateFormat()

  return (
    
    <View style={styles.container}>
    { worldState.isFetching ? (
      <CustomIndicator />
      ) : (
      <>
        <View style={styles.header}>
            <LeftAlignedComponent/>
            <RightAlignedComponent/>
        </View>
        <TouchableOpacity 
        onPress={()=>goToWorld()}>
          { worldState.world ?
                <CustomWorld  
                title={worldState.world.name} 
                subtitle='Johann Gonzales' 
                size={200}/>
              :
                <CustomWorld 
                title="New World!"
                subtitle='Johann Gonzales' 
                size={200}/>
          }
        </TouchableOpacity>
        <View style={[styles.body, styles.shadowProp]}>
          { noteState.isFetching ?
            <CustomIndicator />
          :
            <>
              <Text style={styles.titleNote}>Notas del {nowDate}</Text> 
              { noteState.lastNote ?
                <FlatList
                style={{marginTop: 10,marginHorizontal:10}}
                data={noteState.lastNote.description}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => {
                  return (
                    <View style={{flexDirection: 'row', marginBottom:3}}>
                      <Text>{'\u2022'} </Text>
                      <Text style={{overflow: 'hidden'}}>{item}</Text>
                    </View>)
                  }
                }
              />
              :
                <Text style={{marginHorizontal: 10}}>No hay notas el día de hoy D:</Text>
              }
            </>
          }
          
        </View>
        <TouchableOpacity 
          style={styles.buttonAddNote} 
          onPress={()=>navigation.navigate('AddNote')}>
          <MaterialCommunityIcons 
            name={"plus"}  
            size={20} 
            color="white" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.buttonMoreNotes} 
          onPress={()=>navigation.navigate('ListNotes')}>
          <Text 
            style={{textAlign:'center',color:'black',fontWeight: 'bold',}}>
            Ver Notas Anteriores
          </Text>
        </TouchableOpacity>
      </>
    )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#F9FBFC',
    marginTop:20,
  },
  header: {
    width: "100%",
    height: 50,
    top: 0,
    paddingBottom: 15,
    backgroundColor: "#F9FBFC",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1
  },
  body: {
    flex: 1,
    marginBottom: 20,
    backgroundColor: 'rgb(255, 194, 82)',
    borderRadius: 20
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  titleNote: {
    fontSize: 20,
    fontWeight: 'bold',
    //color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  iconButtonContainer: {
    marginRight: 24,
  },
  pic: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignSelf: 'flex-end'
  },
  leftAlignedContainer: {
    marginRight: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rightAlignedContainer: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'cornflowerblue',
    marginBottom: 35,
    marginTop: 10,
  },
  buttonAddNote: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',

    alignItems:'center',
    justifyContent:'center',

    width:40,
    height:40,

    backgroundColor:'rgb(33, 150, 243)',
    borderRadius:50,

    position:'absolute',
    right: 13,
    bottom: 4,
  },
  buttonMoreNotes: {
    borderWidth:1,
    borderColor:'rgb(166, 222, 104)',

    alignItems:'center',
    justifyContent:'center',

    width:90,
    height:40,

    backgroundColor:'rgb(166, 222, 104)',
    borderRadius:10,

    position:'absolute',
    left: 13,
    bottom: 4,
  }
});

export default Home