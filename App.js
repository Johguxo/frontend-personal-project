import React from 'react';

import MainStack from './src/navigation/MainStack';

import store from './src/redux/store';
import { Provider } from 'react-redux';

export default function App() {

  return (
    <Provider store = { store }>
      <MainStack/>
    </Provider>
  );
}
