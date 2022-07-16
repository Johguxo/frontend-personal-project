import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, {useContext,useState, useEffect} from 'react'
import { 
  Text, 
  View, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator,
  FlatList } from 'react-native'

import { AppContext } from '../../contexts/AppContext'
import { AuthContext } from '../../contexts/AuthContext';
import { logoutSuccess } from '../../hooks/auth/ApiCalls';
import CustomWorld from '../CustomWorld';

const Home = ({ navigation }) => {
  const { state, logOut, loadWorld, getLastNote } = useContext(AppContext);
  const { dispatch} = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [loadingNote, setLoadingNote] = useState(true);

  let worldName = 'Crear mi mundo';
  useEffect(()=> {
    loadWorld();
    getLastNote();
  },[])

  useEffect(()=> {
    if(!state.error && state.world) {
      if (state.world) {
        worldName = state.world.name;
      }
    }
    if (state.error) {
      if (state.error.status == 401) {
        logoutSuccess(dispatch);
        logOut();
      }
    }
    setLoading(false);
  }, [state]);

  useEffect(()=> {
    if(!state.error && state.lastNote) {
      setLoadingNote(false);
    }
    if (state.error) {
      if (state.error.status == 401) {
        logoutSuccess(dispatch);
        logOut();
      }
      if (state.error.status == 404) {
        setLoadingNote(false);
      }
    }
  }, [state]);

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
    if (!state.world) {
      navigation.navigate("NewWorld");
    } else {
      navigation.navigate('MyWorldStack')
    }
  }

  const LeftAlignedComponent = () => {
    return (
      <View style={styles.leftAlignedContainer}>
        <TouchableOpacity onPress={goToNotification} style={styles.iconButtonContainer}>
          <MaterialCommunityIcons name="bell" size={26}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToChat} style={styles.iconButtonContainer}>
          <MaterialCommunityIcons name="forum" size={26}/>
        </TouchableOpacity>
      </View>
    )
  }

  const RightAlignedComponent = () => {
    return (
      <View style={styles.rightAlignedContainer}>
        <TouchableOpacity onPress={goToProfile}>
          <Image
            source={{
              uri: "https://yt3.ggpht.com/yti/APfAmoHc6CeFgdU1gGGq2ZiQ23ZHIb1m4kKiC7Hb6pfj_JA=s88-c-k-c0x00ffffff-no-rj-mo",
            }}
            style={styles.pic}
          />
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
    { loading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={"large"} color="#185ace" />
      </View>
      ) : (
      <>
        <View style={styles.header}>
            <LeftAlignedComponent/>
            <RightAlignedComponent/>
        </View>
        <TouchableOpacity 
        onPress={()=>goToWorld()}>
          { state.world ?
                <CustomWorld  
                title={state.world.name} 
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
          { loadingNote ?
            <View style={styles.loadingContainer}>
              <ActivityIndicator size={"large"} color="#185ace" />
            </View>
          :
            <>
              <Text style={styles.titleNote}>Notas del {nowDate}</Text> 
              { state.lastNote ?
                <FlatList
                style={{marginTop: 10,marginHorizontal:10}}
                data={state.lastNote.description}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => {return (
                    <View style={{flexDirection: 'row', marginBottom:3}}>
                      <Text>{'\u2022'} </Text>
                      <Text style={{overflow: 'hidden'}}>{item}</Text>
                    </View>)}
                  }
              />
              :
                <Text>No hay notas</Text>
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
          onPress={()=>console.log("All Notes")}>
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
    backgroundColor: "#fff",
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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