import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListWorlds from '../components/ListWorlds';

const ListWorldsStack = createNativeStackNavigator()

const ListWorldsStackNavigator = () => {
  return (
    <View style={{flex: 1}} collapsable={false}>
      <ListWorldsStack.Navigator
        initialRouteName='List Worlds'
        screenOptions= {{
          headerTintColor: '#444',
          headerStyle: { backgroundColor: '#eee', height: 60 }
        }}
      >
        <ListWorldsStack.Screen
          name='List Worlds'
          component={ListWorlds}
          options={{headerShown: false}}
        />
      </ListWorldsStack.Navigator>
    </View>
  )
}

export default ListWorldsStackNavigator;