import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import Login from '../components/Login'
import SignUp from '../components/SignUp'

const AuthStack = createNativeStackNavigator()

const AuthStackNavigator = () => {
    return (
         <AuthStack.Navigator
             screenOptions={{
                headerShown: false
            }}>
            <AuthStack.Screen
                name='Login'
                component={Login}
            />
            <AuthStack.Screen
                name='SignUp'
                component={SignUp}
            />
        </AuthStack.Navigator>
    )
}

export default AuthStackNavigator