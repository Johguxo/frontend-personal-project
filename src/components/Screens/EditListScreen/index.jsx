import React, {useContext} from 'react'
import { Text, View, Button, StyleSheet, Image } from 'react-native'


const EditListScreen = ({navigation}) => {

    return (
        <View style={styles.container}>
            <Button title='Editar'/>
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
});

export default EditListScreen