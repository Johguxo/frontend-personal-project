import React, {useContext} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import AuthStackNavigator from './AuthStackNavigator'
import FullStackNavigator from './FullStackNavigator'

import { AppContext } from '../contexts/AppContext';
import { AuthContext } from '../contexts/AuthContext'

import { useAppState } from '../hooks/useAppState'

const Stack = createNativeStackNavigator()

const MainStack = () => {

  const {state} = useContext(AuthContext)
  const renderScreens = () => {
    const initialState = useAppState();
    return state.user ? (
      <Stack.Screen name='FullStackNavigator'>
        {() => (
          <AppContext.Provider value={initialState}>
            <FullStackNavigator />
          </AppContext.Provider>
        )}
      </Stack.Screen>
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