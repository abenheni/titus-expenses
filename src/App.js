import React, { Component } from 'react';
import { resetContext, getContext } from 'kea';
import { Provider } from 'react-redux';
import sagaPlugin from 'kea-saga';
import listenersPlugin from 'kea-listeners';

import MainComponent from './components/Main';

resetContext({
  createStore: {},
  plugins: [
    sagaPlugin,
    listenersPlugin
  ]
})

class App extends Component {

  render() {
    return(
      <Provider store={getContext().store}>
        <MainComponent />
      </Provider>
    )
  }
}

export default App;