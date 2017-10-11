import React, { Component } from 'react';
import App from './../App';
import { Provider } from 'react-redux';
import { configureStore } from './../reducers/configureStore';
import './../index.css';

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.store = null;
    this.persistor = null;
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    const { store, persistor } = configureStore(() => this.setState({ isLoading: false }));
    this.store = store;
    this.persistor = persistor;
  }

  renderLoading() {
    return (
      <span>Loading...</span>
    )
  }

  renderApp() {
    return (
      <Provider store={this.store} persistor={this.persistor}>
        <App />
      </Provider>
    )
  }

  render() {
    debugger;
    return this.state.isLoading ? this.renderLoading() : this.renderApp();
  }
}
