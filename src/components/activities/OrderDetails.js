import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Header.js';
import Footer from '../Footer.js';
import Logo from '../../images/splash_logo.png';
import HeaderItem from '../HeaderItem.js';
import OrderField from '../OrderField.js';
import RestaurantListView from '../RestaurantListView.js';
import CategoryCard from '../CategoryCard.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {
        meals: [],
        restaurant: {},

      }
    }
  }

  componentDidMount() {
    console.log(this.props.store);
    // meals
    this.props.store.data.order.meals.forEach(m => {
      axios.get(`https://hangry-api.herokuapp.com/meal/${m}`).then(data => {
        this.setState(prevState => ({
          ...this.state.order,
          meals: [
            ...this.state.order.meals,
            data.data
          ]
        }))
      });
    });

    // restaurant
    const restaurantId = this.props.store.data.order.restaurant_id;
    axios.get(`https://hangry-api.herokuapp.com/restaurant/${restaurantId}`).then(data => {
      this.setState(prevState => ({
        ...this.state.order,
        restaurant: data.data
        }));
    });
  }

  onClickBack() {
    window.history.back();
  }

  render() {
    return (
      <div className="activity order-details">
        <Header>
          <div className="activity__header">
            <HeaderItem>
              <FontAwesomeIcon icon={faAngleLeft} onClick={() => this.onClickBack() }/>
            </HeaderItem>
            <img className="activity__header-logo" src={Logo} />
            <HeaderItem>
              <FontAwesomeIcon icon={faSearch} />
            </HeaderItem>
          </div>
        </Header>

        <div className="activity__section">
          <h1 className="padded">resumo do pedido</h1>
          <div className="order-details__info padded-x">
            <OrderField name="restaurante" value={this.state.order.restaurant.name} />
            <OrderField name="endereço" value={this.state.order.restaurant.address} />
            <OrderField name="hora de retirada" value={
              `Hoje, de ${this.props.store.data.order.from} às ${this.props.store.data.order.to}`
            } />
            {
              this.state.order.meals.map(meal => {
                return <MealListView key={meal._id}
                                        id={meal._id}
                                        name={meal.name} 
                                        description={meal.description} 
                                        price={meal.price} 
                                        url={meal.image_url}
                                        />
              })
            }
          </div>
        </div>

        <div className="activity__section">
          <h2 className="padded">pagamento</h2>
          <div className="order-details__payment padded">
            {
              
            }
          </div>
        </div>

        <div className="activity__section">
          <h1 className="padded">resumo</h1>
          <div className="order-details__payment padded">
            {
              
            }
          </div>
        </div>

        <Footer p={this.props.history} />
      </div>
    );
  }
}