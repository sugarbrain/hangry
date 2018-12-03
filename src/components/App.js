import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Splash from './activities/Splash';
import Home from './activities/Home';
import '../styles/index.scss';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact={true} path="/" component={Splash} />
          <Route path="/home" component={Home} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;