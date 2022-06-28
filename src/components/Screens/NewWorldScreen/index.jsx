import React, {useContext, useState, useEffect} from 'react'
import { Text, View, Button, StyleSheet, Image } from 'react-native'
import { AppContext } from '../../../contexts/AppContext';
import CustomInput from '../../CustomInput';


const NewWorldScreen = ({navigation}) => {
    const worldInitial = {
        name:'',
        description:'',
    }
    const {saveWorld } = useContext(AppContext);
    const [world, setWorld] = useState(worldInitial);
    const [loading, setLoading] = useState(true);

    const pressSaveWorld = ()=> {
        setLoading(true);
        saveWorld(world)
        .then(()=>{
          setLoading(false);
          navigation.goBack();
          }
        )
    }
    return (
        <View style={styles.container}>

          <CustomInput
            placeholder="Name"
            value={world.name}
            onChangeText={value=> setWorld({...world, name: value})}
          />
          <CustomInput
             placeholder="Description"
            value={world.description}
            textBox={true}
            multiline={true}
            onChangeText={value=> setWorld({...world, description: value})}
          />
          <Button onPress={()=>pressSaveWorld()} title='Save'/>
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

export default NewWorldScreen