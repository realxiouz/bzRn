import React from 'react'
import Route from './src/route'
import { Provider } from 'mobx-react'
import store from './src/store/index.js'

export default class App extends React.Component {
  render() {
    return (
      <Provider rootStore={store}>
        <Route />
      </Provider>
    )
  }
}