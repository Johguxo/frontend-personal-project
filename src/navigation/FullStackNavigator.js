import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeStackNavigator from './HomeStack'
import MyWorldStackNavigator from './MyWorldStack'
import ListWorldsStackNavigator from './ListWorldsStack'
import NewWorldScreen from '../components/Screens/NewWorldScreen';

const FullStack = createMaterialBottomTabNavigator();

const FullStackNavigator = () => {
    const worldState = useSelector(state => state.world);
    return (
         <FullStack.Navigator
            initialRouteName="HomeStack"
            activeColor="#f0edf6"
            inactiveColor="#3e2465"
            barStyle={{ backgroundColor: '#694fad' }}
         >
            <FullStack.Screen
                name='HomeStack'
                component={HomeStackNavigator}
                options={{
                    tabBarLabel:'Home',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="home" color={color} size={26}/>
                    )
                }}
            />
            {worldState.world ?
            (
            <FullStack.Screen
                name='MyWorldStack'
                component={MyWorldStackNavigator}
                options={{
                    tabBarLabel:'My World',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="earth" color={color} size={26}/>
                    )
                }}
            />
            )
            : (
            <FullStack.Screen
                name='NewWorld'
                component={NewWorldScreen}
                options={{
                    title: 'Create new world',
                    tabBarLabel:'New World',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="earth" color={color} size={26}/>
                    )
                }}
            />
            )}
            
            {/*<FullStack.Screen
                name='ListWorldsStack'
                component={ListWorldsStackNavigator}
                options={{
                    tabBarLabel:'Search',
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcons name="text-search" color={color} size={26}/>
                    )
                }}
            />*/}
        </FullStack.Navigator>
    )
}

export default FullStackNavigator