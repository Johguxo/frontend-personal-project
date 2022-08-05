import React, {useContext, useState, useEffect} from 'react'
import { Text, View, Button, StyleSheet, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from '../../../contexts/AppContext';
import { saveWorld } from '../../../redux/actions/worldActions';
import CustomInput from '../../CustomInput';


const NewWorldScreen = ({navigation}) => {
    const worldInitial = {
        name:'',
        description:'',
    }

    const dispatch = useDispatch();
    const worldState = useSelector(state => state.world);
    const [world, setWorld] = useState(worldInitial);


    const pressSaveWorld = () => {
      dispatch(saveWorld(world));
    }

    useEffect(() => {
      if (worldState.error) {
        if (worldState.errorResponse.status == 401) {
          ToastAndroid.show(
            `Error: ${worldState.errorResponse.statusText}`,
            ToastAndroid.LONG
          );
          dispatch(logout());
        }
      }
    }, [worldState]);
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
      paddingTop: 40,
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

export default NewWorldScreen