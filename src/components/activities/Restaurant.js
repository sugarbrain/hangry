import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Header.js';
import Footer from '../Footer.js';
import Logo from '../../images/splash_logo.png';
import HeaderItem from '../HeaderItem.js';
import  MealListView from '../MealListView.js';
import OrderBar from '../OrderBar.js';
import CheckoutCard from '../CheckoutCard.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

export default class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: {
          name: "",
          category: "",
          distance: "",
          image_url: "",
          phone: "",
      },
      meals: [],
      order: {
        meals: [],
        total_price: 0,
        from: "",
        to: "",
        multiplier: 1,
      },
      checkout_slot: [
        { id: 1, from: '10:00', to: '10:30', multiplier: 0.8 },
        { id: 2, from: '10:30', to: '11:00', multiplier: 0.8 },
        { id: 3, from: '11:00', to: '11:30', multiplier: 0.9 },
        { id: 4, from: '11:30', to: '12:00', multiplier: 1.2 },
        { id: 5, from: '12:30', to: '13:00', multiplier: 1.2 },
        { id: 6, from: '13:00', to: '13:30', multiplier: 1.1 },
        { id: 7, from: '13:30', to: '14:00', multiplier: 0.9 },
        { id: 8, from: '14:00', to: '14:30', multiplier: 0.8 },
        { id: 9, from: '14:30', to: '15:00', multiplier: 0.8 },
      ]
    }

    this.onClickBack = this.onClickBack.bind(this);
    this.addMealToOrder = this.addMealToOrder.bind(this);
    this.addCheckoutToOrder = this.addCheckoutToOrder.bind(this);
  }

  componentDidMount() {
    const restId = this.props.match.params.id;
    console.log(`Fetching restaurant ${restId}...`);

    axios.get(`https://hangry-api.herokuapp.com/restaurant/${restId}`)
    .then(data => {
        console.log(data);
        this.setState(prevState => ({
            model: data.data,
            order: {
              ...prevState.order,
              restaurant_id: data.data._id
            }
        }));
    }).catch(err => {
        console.log(err);
    });

    axios.get(`https://hangry-api.herokuapp.com/restaurant/${restId}/getMeals`)
    .then(data => {
        console.log(data);
        this.setState(prevState => ({
            meals: data.data
        }));
    }).catch(err => {
        console.log(err);
    });
  }

  onClickBack() {
    window.history.back();
  }

  addMealToOrder(mealId, price, alreadyInOrder) {
    if(!alreadyInOrder) {
      let total_price = this.state.order.total_price + Number(price);
      let meals = this.state.order.meals;
      meals.push(mealId);

      this.setState({
        ...this.state,
        order: {
          meals,
          total_price,
          from: this.state.from,
          to: this.state.to,
          multiplier: this.state.multiplier
        }
      });
    } else {
      const index = this.state.order.meals.indexOf(mealId);
      let meals = this.state.order.meals;
      meals.splice(index,1);

      let total_price = this.state.order.total_price - Number(price);
      this.setState({
        ...this.state,
        order: {
          meals,
          total_price,
          from: this.state.from,
          to: this.state.to,
          multiplier: this.state.multiplier
        }
      });

    }
    console.log(this.state);
  }


  addCheckoutToOrder(from, to, multiplier, alreadyInOrder) {
    if(!alreadyInOrder) {
      this.setState({
        order: {
          meals: this.state.meals,
          total_price: this.state.order.total_price,
          from,
          to,
          multiplier
        }
      });
    }
    console.log(this.state);
  }
  
  
  render() {
    return (
      <div className="activity restaurant">
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

        <div className="restaurant__box" style={ { backgroundImage: `url(${  this.state.model.image_url })`} }>
            <div className="name">
                { this.state.model.name }
            </div>
            <div className="details">
                { this.state.model.category + " • " + this.state.model.distance + " • " + this.state.model.phone}
            </div>
        </div>

          <div className="activity__section">
            <h2 className="padded" >horário de retirada</h2>
            
            <div className="restaurant__checkout">
              {
                this.state.checkout_slot.map(slot => <CheckoutCard key = {slot.id}
                                                                  from = {slot.from}
                                                                  to = {slot.to}
                                                                  multiplier = {slot.multiplier}
                                                                  active={this.state.order.from === slot.from && this.state.order.to == slot.to} 
                                                                  addCheckoutToOrder={(from, to, multiplier, active) => this.addCheckoutToOrder(from, to, multiplier, active)}
                                                    />) 
              }
              </div>
            </div>

        <div className="activity__section">
          
          <h2 className="padded" >pratos</h2>
          
          <div className="restaurant__meals padded-x">
            {
                this.state.meals.map(meal => {
                  if(meal.type === 'meal') {
                    return <MealListView key={meal._id}
                                        id={meal._id}
                                        name={meal.name} 
                                        description={meal.description} 
                                        price={meal.price} 
                                        url={meal.image_url}
                                        active={this.state.order.meals.includes(meal._id)} 
                                        addMealToOrder={(mealId, price, active) => this.addMealToOrder(mealId, price, active)}
                                        />
                  }
                })
            }
          </div>

          
        </div>

        <div className="activity__section">
          
          <h2 className="padded" >adicionais</h2>
          
          <div className="restaurant__meals padded-x">
            {
                this.state.meals.map(meal => {
                  if(meal.type === 'extra') {
                    return <MealListView key={meal._id}
                                        id={meal._id}
                                        name={meal.name} 
                                        description={meal.description} 
                                        price={meal.price} 
                                        url={meal.image_url}
                                        active={this.state.order.meals.includes(meal._id)} 
                                        addMealToOrder={(mealId, price, active) => this.addMealToOrder(mealId, price, active)}
                                        />
                  }
                })
            }
          </div>

          
        </div>

        {

          this.state.order.meals.length > 0 ?
            <OrderBar totalPrice={this.state.order.total_price * this.state.order.multiplier} />
            : <Footer p={this.props.history} />
        }
      </div>
    );
  }
}