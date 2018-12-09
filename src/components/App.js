import React, { Component } from 'react';
import axios from 'axios';
import { HashRouter, Switch, Route, FadeIn } from 'react-router-dom';
import Splash from './activities/Splash';
import HomeActivity from './activities/Home';
import RestaurantActivity from './activities/Restaurant';
import OrderDetailsActivity from './activities/OrderDetails';
import OrdersActivity from './activities/Orders';
import ProfileActivity from './activities/Profile';
import '../styles/index.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSideMenuVisible: false,
      data: {
        restaurants: [],
        order: {
          meals: [],
          total_price: 0,
          from: "",
          to: "",
          multiplier: 1,
          restaurant_id: ""
        }
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
            <Route path="/orders" render={ 
              props => <OrdersActivity store={this.state} store={this.state} setStore={s => this.setStore(s)} {...props} />} 
            />
            <Route path="/profile" render={ 
              props => <ProfileActivity store={this.state} store={this.state} setStore={s => this.setStore(s)} {...props} />} 
            />
            <Route path="/restaurant/:id" render={ 
              props => <RestaurantActivity store={this.state} setStore={s => this.setStore(s)} {...props} />} 
            />
            <Route path="/order-details" render={ 
              props => <OrderDetailsActivity store={this.state} setStore={s => this.setStore(s)} {...props} />} 
            />
          </Switch>
        </HashRouter>
      </>
    );
  }
}

export default App;