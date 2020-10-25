import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Shop from './src/Shop'

import store from './src/redux/store'
import { Provider } from 'react-redux';




export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Shop />
      </Provider>
    );
  }
}
