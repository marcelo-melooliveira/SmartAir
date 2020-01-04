import React from 'react';
import { View } from 'react-native';
import Myapp from './src/routes';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers/index'
//import {Store} from './src/store/index'
//import Lottie from 'lottie-react-native';

// import { Container } from './styles';

export default function RNlottie() {
  return (
    <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
   
    <Myapp />

    </Provider>
  );
}
