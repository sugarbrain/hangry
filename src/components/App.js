import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Splash from './activities/Splash';
import Home from './activities/Home';
import '../styles/index.scss';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <>
          <Route exact path="/" component={Splash} />
          <Route path="/home" component={Home} />
        </>
      </HashRouter>
    );
  }
}

export default App;