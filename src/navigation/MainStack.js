import React, {useContext, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import AuthStackNavigator from './AuthStackNavigator'
import FullStackNavigator from './FullStackNavigator'
import { loadUser } from '../redux/actions/authActions'

const Stack = createNativeStackNavigator()

const MainStack = () => {

  const authState = useSelector(state => state.auth)
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  },[])

  const renderScreens = () => {
    return authState.user ? (
      <Stack.Screen 
        name='FullStackNavigator'
        component={FullStackNavigator}
      />
    ) : (
      <Stack.Screen
        name='AuthStack'
        component={AuthStackNavigator}
      />
    );
  }

  return (
      <NavigationContainer>
          <Stack.Navigator 
              screenOptions={{
                  headerShown: false
              }}>
              { renderScreens() }
          </Stack.Navigator>
      </NavigationContainer>
  )
}

export default MainStack