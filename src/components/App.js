import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import Splash from './activities/Splash';
import Home from './activities/Home';
import '../styles/index.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <Route exact path="/" component={Splash} render={() => {
            setTimeout(() => {
              <Redirect to="Home" />
            }, 1000);
          }} />
          <Route path="/home" component={Home} />
        </>
      </Router>
    );
  }
}

export default App;