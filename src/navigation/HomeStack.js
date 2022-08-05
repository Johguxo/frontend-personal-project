import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../components/Home';

import NotificationsScreen from '../components/Screens/NotificationScreen';
import ProfileScreen from '../components/Screens/ProfileScreen';
import ChatScreen from '../components/Screens/ChatScreen';
import AddNoteScreen from '../components/Screens/AddNoteScreen';
import NewWorldScreen from '../components/Screens/NewWorldScreen';
import ListNotesScreen from '../components/Screens/ListNotesScreen';


const HomeStack = createNativeStackNavigator()

const HomeStackNavigator = () => {
  return (
    <View style={{flex: 1}} collapsable={false}>
      <HomeStack.Navigator
        initialRouteName='Home'
        screenOptions= {{
          headerTintColor: '#444',
          headerStyle: { backgroundColor: '#eee', height: 60 }
        }}
      >
        <HomeStack.Screen
          name='Home'
          component={Home}
          options= {{
            headerShown:false
          }}
        />
        <HomeStack.Screen
          name='Profile'
          component={ProfileScreen}
        />
        <HomeStack.Screen
          name='Notifications'
          component={NotificationsScreen}
        />
        <HomeStack.Screen
          name='Chat'
          component={ChatScreen}
        />
        <HomeStack.Screen
          name='NewWorld'
          options = {{title: 'Create new world'}}
          component={NewWorldScreen}
        />
        <HomeStack.Screen
          name='AddNote'
          options = {{title: 'Nota'}}
          component={AddNoteScreen}
        />
        <HomeStack.Screen
          name='ListNotes'
          options = {{title: 'Lista de Notas'}}
          component={ListNotesScreen}
        />
      </HomeStack.Navigator>
    </View>
  )
}

export default HomeStackNavigator;