import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListWorlds from '../components/ListWorlds';

const ListWorldsStack = createNativeStackNavigator()

const ListWorldsStackNavigator = () => {
  return (
    <ListWorldsStack.Navigator
      screenOptions= {{
        headerTintColor: '#444',
        headerStyle: { backgroundColor: '#eee', height: 60 }
      }}
    >
      <ListWorldsStack.Screen
        name='ListWorlds'
        component={ListWorlds}
        options={{headerShown: false}}
      />
    </ListWorldsStack.Navigator>
  )
}

export default ListWorldsStackNavigator;