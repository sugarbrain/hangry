import React, { Component } from 'react';
import axios from 'axios';
import { HashRouter, Switch, Route, FadeIn } from 'react-router-dom';
import Splash from './activities/Splash';
import HomeActivity from './activities/Home';
import RestaurantActivity from './activities/Restaurant';
import '../styles/index.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSideMenuVisible: false,
      userName: 'Dado Dolabella',
      data: {
        closeToYou: [],
        allRestaurants: [],
        restaurants: []
      }
    }

    this.setStore = this.setStore.bind(this);
  }

  setStore(newState) {
    this.setState(newState);
  }

  render() {
    return (
      <>
        <meta name="theme-color" content="#fe5722"></meta>
        <HashRouter>
          <Switch>
            <Route exact={true} path="/" render={ props =>  <Splash {...props} /> } />
            <Route path="/home" render={ 
              props => <HomeActivity store={this.state} store={this.state} setStore={s => this.setStore(s)} {...props} />} 
            />
            <Route path="/restaurant/:id" render={ 
              props => <RestaurantActivity store={this.state} setStore={s => this.setStore(s)} {...props} />} 
            />
          </Switch>
        </HashRouter>
      </>
    );
  }
}

export default App;