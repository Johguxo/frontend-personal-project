import React from 'react';
import MainStack from './src/navigation/MainStack';
import { useAuth } from './src/hooks/useAuth';
import { AuthContext } from './src/contexts/AuthContext';

export default function App() {
  const { state, dispatch } = useAuth();
  return (
    <AuthContext.Provider value={{state,dispatch}}>
      <MainStack/>
    </AuthContext.Provider>
  );
}
