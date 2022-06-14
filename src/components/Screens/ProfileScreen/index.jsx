import React, {useContext} from 'react'
import { Text, View, Button, StyleSheet, Image } from 'react-native'

import { AuthContext } from '../../../contexts/AuthContext'
import { UserContext } from '../../../contexts/UserContext'
import { logoutSuccess } from '../../../hooks/auth/ApiCalls'

const ProfileScreen = ({navigation}) => {

    const {token} = useContext(UserContext)
    const { state, dispatch } = useContext(AuthContext)

    return (
        <View style={styles.container}>
            <Image 
            source={{uri: 'https://yt3.ggpht.com/yti/APfAmoHc6CeFgdU1gGGq2ZiQ23ZHIb1m4kKiC7Hb6pfj_JA=s88-c-k-c0x00ffffff-no-rj-mo'}}
            style={styles.pic}
            />
            <Button title='Save'/>
            <View style={styles.logOutButton}>
                <Button color='red' title='Log Out' onPress={()=>logoutSuccess(dispatch)} />
            </View>
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
        width: 80,
        height: 80,
        borderRadius: 21,
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 'xx-large',
      color: 'cornflowerblue',
      marginBottom: 35,
      marginTop: 10,
    },
    logOutButton: {
        marginTop: 20,
    }
});

export default ProfileScreen