import React, {useContext,useState} from 'react'
import { Text, View, Button, StyleSheet, Image, TextInput } from 'react-native'

import { UserContext } from '../../../contexts/UserContext'


const AddNoteScreen = ({navigation, route}) => {

    const {token} = useContext(UserContext)

    const [text,setText] = useState('')

    const listNotes = route.params.listNotes;
    const setListNotes = route.params.setListNotes;

    const newNote = () => {
        listNotes.push({description:text});
        setListNotes(listNotes);
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <TextInput 
                style={{height: 100, borderColor: 'gray', borderWidth: 1, marginBottom:20}} 
                onChangeText={(text) => setText(text)} 
                multiline={true}
                value={text} 
            />
            <Button title='Add' onPress={()=>newNote()}/>
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
});

export default AddNoteScreen