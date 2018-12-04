import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Header.js';
import Footer from '../Footer.js';
import Logo from '../../images/splash_logo.png';
import HeaderItem from '../HeaderItem.js';
import RestaurantCard from '../RestaurantCard.js';
import RestaurantListView from '../RestaurantListView.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: []
    }
  }

  componentDidMount() {
    axios.get('http://hangry-api.herokuapp.com/restaurant')
         .then((data) => {
           console.log(data);
           this.setState(prevState => ({
              restaurants: [ ...data.data ],
            }));
         });
  }
  render() {
    return (
      <div className="home">
        <Header>
          <div className="home__header">
            <HeaderItem>
              <FontAwesomeIcon icon={faBars} />
            </HeaderItem>
            <img className="home__header-logo" src={Logo} />
            <HeaderItem>
              <FontAwesomeIcon icon={faSearch} />
            </HeaderItem>
          </div>
        </Header>

        <div className="home__section">
          <h1 className="padded" style={ { color: "#fff" } }>em destaque</h1>
          <div className="home__restaurants">
            {
              this.state.restaurants.map(restaurant => {
                return <RestaurantCard name={ restaurant.name } 
                                       category={ restaurant.category} 
                                       url={ restaurant.imageURL } 
                                       distance="2km" 
                                       money="$$" />
              })
            }
          </div>
        </div>

        <div className="home__section ">
          <h1 className="padded">mais pedidos</h1>
          <div className="home__rest-list-view padded">
            {
              this.state.restaurants.map(restaurant => {
                return <RestaurantListView name={ restaurant.name } 
                                       category={ restaurant.category } 
                                       url={ restaurant.imageURL } 
                                       distance="2km" 
                                       money="$$" />
              })
            }
          </div>
        </div>

        <Footer p={this.props.history} />
      </div>
    );
  }
}