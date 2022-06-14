import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../components/Home';
import CustomHeader from '../components/CustomHeader';

import NotificationsScreen from '../components/Screens/NotificationScreen';
import ProfileScreen from '../components/Screens/ProfileScreen';
import ChatScreen from '../components/Screens/ChatScreen';
import AddNoteScreen from '../components/Screens/AddNoteScreen.jsx';

const HomeStack = createNativeStackNavigator()

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
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
        name='Add Note'
        component={AddNoteScreen}
      />
    </HomeStack.Navigator>
  )
}

export default HomeStackNavigator;