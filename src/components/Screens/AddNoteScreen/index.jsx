import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Button, StyleSheet, Image, TextInput } from 'react-native'

import { newNote, updateNote } from '../../../redux/actions/noteActions'
import { logout, updateProfile } from '../../../redux/actions/authActions'

const AddNoteScreen = ({navigation}) => {

    const dispatch = useDispatch()
    const noteState = useSelector(state => state.note)

    const [text,setText] = useState('');

    const dateFormat = () => {
        const dateFormatted = new Date();
        const day = dateFormatted.getDate();
        const month = dateFormatted.getMonth() + 1;
        const year = dateFormatted.getFullYear();
        return `${day}/${month}/${year}`;
      }
    
    const nowDate = dateFormat()

    const newOrEditNote = () => {
        if (noteState.lastNote) {
            dispatch(updateNote(noteState.lastNote, {title:noteState.lastNote.title, description: [...noteState.lastNote.description, text]}))
        } else {
            dispatch(newNote({title: nowDate, description: [text]}))
        }
        navigation.goBack();
    }


    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.inputText} 
                onChangeText={(text) => setText(text)} 
                multiline={true}
                value={text} 
            />
            <Button title='Add' onPress={()=>newOrEditNote()} disabled={text === ''}/>
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
    pic: {
        width: 42,
        height: 42,
        borderRadius: 21,
        alignSelf: 'flex-end'
    },
    title: {
      fontWeight: 'bold',
      fontSize: 15,
      color: 'cornflowerblue',
      marginBottom: 35,
      marginTop: 10,
    },
    inputText: {
        padding: 10,
        height: 100, 
        borderColor: 'gray', 
        borderWidth: 1, 
        marginBottom:20
    }
});

export default AddNoteScreen