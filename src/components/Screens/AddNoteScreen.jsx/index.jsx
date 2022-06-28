import React, {useContext,useState} from 'react'
import { Text, View, Button, StyleSheet, Image, TextInput } from 'react-native'
import { AppContext } from '../../../contexts/AppContext';


const AddNoteScreen = ({navigation, route}) => {

    const [text,setText] = useState('');
    const { state, logOut, newNote, updateNote } = useContext(AppContext);


    const dateFormat = () => {
        const dateFormatted = new Date();
        const day = dateFormatted.getDate();
        const month = dateFormatted.getMonth() + 1;
        const year = dateFormatted.getFullYear();
        return `${day}/${month}/${year}`;
      }
    
    const nowDate = dateFormat()

    const newOrEditNote = () => {
        if (state.lastNote) {
            state.lastNote.description.push(text)
            updateNote(state.lastNote, {description: state.lastNote.description})
        } else {
            newNote({title: nowDate, description: [text]})
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
            <Button title='Add' onPress={()=>newOrEditNote()}/>
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
      fontSize: 'xx-large',
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