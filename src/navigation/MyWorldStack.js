import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MyWorld from '../components/MyWorld';
import EditWorldScreen from '../components/Screens/EditWorldScreen';
import EditListScreen from '../components/Screens/EditListScreen';
import AddListScreen from '../components/Screens/AddListScreen';

const MyWorldStack = createNativeStackNavigator()

const MyWorldStackNavigator = () => {
  return (
    <MyWorldStack.Navigator
      screenOptions= {{
        headerTintColor: '#444',
        headerStyle: { backgroundColor: '#eee', height: 60 }
      }}
    >
      <MyWorldStack.Screen
        name='My World'
        component={MyWorld}
        options={{headerShown: false}}
      />
      <MyWorldStack.Screen
        name='Edit World'
        component={EditWorldScreen}
      />
      <MyWorldStack.Screen
        name='Add List'
        component={AddListScreen}
      />
      <MyWorldStack.Screen
        name='Edit List'
        component={EditListScreen}
      />
    </MyWorldStack.Navigator>
  )
}

export default MyWorldStackNavigator;