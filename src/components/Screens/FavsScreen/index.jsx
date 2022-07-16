import React, {useContext} from 'react'
import { Text, View, Button, StyleSheet, Image } from 'react-native'

const FavsScreen = ({navigation}) => {

    return (
        <View style={styles.container}>
            <Image 
            source={{uri: 'https://yt3.ggpht.com/yti/APfAmoHc6CeFgdU1gGGq2ZiQ23ZHIb1m4kKiC7Hb6pfj_JA=s88-c-k-c0x00ffffff-no-rj-mo'}}
            style={styles.pic}
            />
            <Text style={styles.title}>Citas</Text>
            <Button title='Welcome'/>
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

export default FavsScreen