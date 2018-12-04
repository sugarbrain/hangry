import React, { Component } from 'react';
import axios from 'axios';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Splash from './activities/Splash';
import Home from './activities/Home';
import '../styles/index.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSideMenuVisible: false,
      userName: 'Dado Dolabella'
    }
  }

  render() {
    return (
      <>
        <meta name="theme-color" content="#fe5722"></meta>
        <HashRouter>
          <Switch>
            <Route exact={true} path="/" component={Splash} />
            <Route path="/home" render={ ({ history }) => <Home store={this.state} history={history} />} />
          </Switch>
        </HashRouter>
      </>
    );
  }
}

export default App;