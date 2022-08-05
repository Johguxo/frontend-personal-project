import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, FlatList, Text } from 'react-native'

import CustomIndicator from '../../CustomIndicator'
import { loadNotes } from '../../../redux/actions/noteActions'

const ListNotesScreen = ({navigation}) => {

    const dispatch = useDispatch()
    const noteState = useSelector(state => state.note)
    const authState = useSelector(state => state.auth)

    useEffect(()=> {
      dispatch(loadNotes(authState.user._id));
    },[])

    const renderNote = ({ item }) => {
      return (
        <View style={styles.containerBox}>
          <View styles={styles.containerNote}>
              <Text style={styles.titleNote} key={item.title}>{item.title}</Text>
              <FlatList
                data={item.description}
                renderItem={({ item }) => {
                  return (
                    <View style={{flexDirection: 'row', marginBottom:3}}>
                      <Text>{'\u2022'} </Text>
                      <Text style={{overflow: 'hidden'}}>{item}</Text>
                    </View>)
                  }
                }
                listKey={(item, index) => `_key${index.toString()}`}
                keyExtractor={(item, index) => `_key${index.toString()}`}
              />
          </View>
        </View>
    )};

    return (
        <View style={styles.container}>
          { noteState.isFetching ?
            <CustomIndicator />
          : (
            noteState.notes.length > 0 ? (
              <FlatList
                numColumns={2}
                data={noteState.notes}
                renderItem={renderNote}
                keyExtractor={(item) => item._id}
              />
            ): (
              <Text>No hay notas</Text>
            )
          )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      paddingHorizontal: 20,
      backgroundColor: '#F9FBFC',
    },
    titleNote: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 10,
    }, 
    containerNoteFull: {
      flex: 1,
      marginBottom: 20,
      backgroundColor: 'rgb(255, 194, 82)',
      borderRadius: 20,
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
    },
    containerNoteFullTwo: {
      marginBottom: 20,
      backgroundColor: 'rgb(255, 194, 82)',
      borderRadius: 20
    },
    containerBox: {
      flex: 1,

    },  
    containerNote : {
      backgroundColor: "white",
      width: "90%",

      borderColor: "#e8e8e8",
      borderWidth: 1,
      borderRadius: 5,

      paddingHorizontal: 10,
      paddingVertical: 10,
      marginVertical: 5,
      marginRight: 5,
    }
});

export default ListNotesScreen