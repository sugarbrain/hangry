import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Header.js';
import Footer from '../Footer.js';
import Logo from '../../images/splash_logo.png';
import HeaderItem from '../HeaderItem.js';
import OrderField from '../OrderField.js';
import MealListView from '../MealListView.js';
import PaymentBox from '../PaymentBox.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {
        meals: [],
        restaurant: {},
      },
      payments_collapsed: [],
      payments_method: [
        {id: 1, name: "Dinheiro", description: "Pague sua conta no próprio estabelecimento", options: ['Sim', 'Não']}, 
        {id: 2, name: "Vale alimentação", description: "Pague sua conta no própio estabelecimento", options: ['Sodexo']},
        {id: 3, name: "Vale refeição", description: "Pague sua conta no próprio estabelecimento", options: ['Alelo']}
      ]
    }
    this.addMealToOrder.bind(this);
    this.addPaymentToCollapse.bind(this);
  }

  componentDidMount() {
    console.log(this.props.store);
    this.props.store.data.order.meals.forEach(m => {
      axios.get(`https://hangry-api.herokuapp.com/meal/${m}`).then(data => {
        let meals = this.state.order.meals;
        let restaurant = this.state.order.restaurant;
        meals.push(data.data);
        this.setState({
          ...this.state,
          order: {
            meals,
            restaurant
          }
        });
      });
    })

    // restaurant
    const restaurantId = this.props.store.data.order.restaurant_id;
    axios.get(`https://hangry-api.herokuapp.com/restaurant/${restaurantId}`).then(data => {
      let meals = this.state.order.meals;
      let restaurant = data.data;
      this.setState({
          ...this.state,
          order: {
            meals,
            restaurant
          }
        });
    });

    console.log(this.state);
  }

  addMealToOrder(mealId, price, active){
  }

  addPaymentToCollapse(payment, alreadyCollapse) {
    if(!alreadyCollapse){
      let payments = this.state.payments_collapsed;
      payments.push(payment)
      this.setState({
        ...this.state,
        payments
      })
    }else {
      const index = this.state.payments_collapsed.indexOf(payment);
      let payments = this.state.payments_collapsed;
      payments.splice(index,1);
      this.setState({
        ...this.state,
        payments
      })
    }
    console.log(this.state);
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
            <OrderField name="pratos" value=
            {
              this.state.order.meals.map(meal => {
                if(meal.type === 'meal') {
                return <MealListView key={meal._id}
                                        id={meal._id}
                                        name={meal.name} 
                                        description={meal.description} 
                                        price={meal.price} 
                                        url={meal.image_url}
                                        active={false}
                                        addMealToOrder={(mealId, price, active) => this.addMealToOrder(mealId, price, active)}
                                        />
              }})
            }/>
            <OrderField name="adicionais" value=
            {
              this.state.order.meals.map(meal => {
                if(meal.type === 'extra') {
                return <MealListView key={meal._id}
                                        id={meal._id}
                                        name={meal.name} 
                                        description={meal.description} 
                                        price={meal.price} 
                                        url={meal.image_url}
                                        active={false.toString()}
                                        addMealToOrder={(mealId, price, active) => this.addMealToOrder(mealId, price, active)}
                                        />
              }})
            }/>
            {
              this.props.store.data.order.multiplier > 1?
              <OrderField name="taxa de aumento" value={((this.props.store.data.order.multiplier)*100)-100 + "%"}/>:
              this.props.store.data.order.multiplier < 1?
              <OrderField name="taxa de desconto" value={100-((this.props.store.data.order.multiplier)*100) + "%"}/>:
              <div></div>
            }
            <OrderField name="valor total" value={'R$ '+ ((this.props.store.data.order.total_price*this.props.store.data.order.multiplier)/100).toFixed(2)}/>
          </div>
        </div>

        <div className="activity__section">
          <h1 className="padded">pagamento</h1>
          <div className="order-details__payment padded">
          {
            this.state.payments_method.map(payment => {
              return <PaymentBox key={payment.id} 
                                name={payment.name}
                                description={payment.description}
                                options={payment.options}
                                active={this.state.payments_collapsed.includes(payment.name)}
                                addPaymentToCollapse={(payment, active) => this.addPaymentToCollapse(payment, active)}/>
            })
          }
          </div>
        </div>
        <Footer p={this.props.history} />
      </div>
    );
  }
}