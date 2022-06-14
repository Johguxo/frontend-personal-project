import React, {useContext} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import AuthStackNavigator from './AuthStackNavigator'
import FullStackNavigator from './FullStackNavigator'

import { UserContext } from '../contexts/UserContext';
import { AuthContext } from '../contexts/AuthContext'

const Stack = createNativeStackNavigator()

const MainStack = () => {

  const {state} = useContext(AuthContext)

  const renderScreens = () => {
    console.log(state)
    return state.user ? (
      <Stack.Screen name='FullStackNavigator'>
        {() => (
          <UserContext.Provider value={state.user}>
            <FullStackNavigator />
          </UserContext.Provider>
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