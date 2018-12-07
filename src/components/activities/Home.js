import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Header.js';
import Footer from '../Footer.js';
import Logo from '../../images/splash_logo.png';
import HeaderItem from '../HeaderItem.js';
import RestaurantCard from '../RestaurantCard.js';
import RestaurantListView from '../RestaurantListView.js';
import CategoryCard from '../CategoryCard.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [ {
          id: 1,
          name: 'comida brasileira'
        }, {
          id: 2,
          name: 'pizza'
        }, {
          id: 3,
          name: 'japonesa'
        }, {
          id: 4,
          name: 'fast-food'
        }, {
          id: 5,
          name: 'mexicana'
        }
      ]
    }
  }

  componentDidMount() {
    axios.get('https://hangry-api.herokuapp.com/restaurant')
         .then((data) => {
            console.log(data);
            this.props.setStore({
              data: {
                restaurants: [ ...data.data ]
              }
            })
    });
  }
  render() {
    return (
      <div className="activity home">
        <Header>
          <div className="activity__header">
            <HeaderItem>
              <FontAwesomeIcon icon={faBars} />
            </HeaderItem>
            <img className="activity__header-logo" src={Logo} />
            <HeaderItem>
              <FontAwesomeIcon icon={faSearch} />
            </HeaderItem>
          </div>
        </Header>

        <div className="activity__section">
          <h1 className="padded" style={ { color: "#fff" } }>perto de você</h1>
          <div className="home__restaurants">
            {
              this.props.store.data.restaurants.map(restaurant => {
                return <RestaurantCard key={restaurant._id}
                                       id={restaurant._id}
                                       name={ restaurant.name } 
                                       category={ restaurant.category} 
                                       url={ restaurant.image_url } 
                                       distance={ restaurant.distance }
                                       money="$$" />
              })
            }
          </div>
        </div>

        <div className="activity__section ">
          <h1 className="padded">restaurantes</h1>
          <div className="home__rest-list-view padded-x">
            {
              this.props.store.data.restaurants.map(restaurant => {
                return <RestaurantListView key={restaurant._id}
                                       id={restaurant._id}
                                       name={ restaurant.name } 
                                       category={ restaurant.category } 
                                       url={ restaurant.image_url } 
                                       distance="2km" 
                                       money="$$" />
              })
            }
          </div>
        </div>

        <div className="activity__section">
          <h1 className="padded">categorias</h1>
          <div className="home__category-list padded-x">
            {
              this.state.categories.map(category => {
                return <CategoryCard key={category.id} name={category.name} />
              })
            }
          </div>
        </div>

        <Footer p={this.props.history} />
      </div>
    );
  }
}