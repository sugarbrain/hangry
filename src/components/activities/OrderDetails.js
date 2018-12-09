import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Header.js';
import Footer from '../Footer.js';
import Logo from '../../images/splash_logo.png';
import HeaderItem from '../HeaderItem.js';
import OrderField from '../OrderField.js';
import MealListView from '../MealListView.js';
import PaymentBox from '../PaymentBox.js';
import OrderBar from '../OrderBar.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAngleLeft, faMarsStrokeH } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {
        meals: [],
        restaurant: {},
      },
      payment_selected: "",
      payments_collapsed: [],
      payments_method: [
        {id: 1, 
          name: "Local", 
          description: "Pague sua conta quando for buscar sua comida", 
          question: {
            text: "1. Qual será a forma de pagamento?", 
            options: [
              {
                id: 1, 
                value: 'Dinheiro'
              },
              {
                id: 2, 
                value: 'Vale refeição'
              },
              {
                id: 3,
                value: 'Vale alimentação'
              }
            ]
          }
        }
      ],
    }
    this.createOrder.bind(this);
    this.addPaymentToCollapse.bind(this);
    this.addPayment.bind(this);
    this.dummy.bind(this);
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
  
  createOrder(data){
    let req = {
      url: `https://hangry-api.herokuapp.com/order/`,
      method: 'POST',
      data: {
        restaurant_id: data.restaurant_id,
				meals: data.meals,
				from_timestamp: data.from,
				to_timestamp: data.to,
				total_price: data.total_price,
        multiplier: data.multiplier,
				status: "Pedido",
      }
    }
    axios(req).then(data => {
      let sessions = this.props.store.sessions;
      sessions.push(data.data.ops[0].session);
      this.props.setStore({
        ...this.props.store,
        sessions
      })
    });
    this.props.history.push('/order-finish');
  }

  dummy(){
  }

  addPaymentToCollapse(payment, alreadyCollapse) {
    if(alreadyCollapse == "false"){
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

  addPayment(value){
    let payment_selected = value;
    this.setState({
      ...this.state,
      payment_selected
    });
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
                                        addMealToOrder={(mealId, price, active) => this.dummy()}
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
                                        addMealToOrder={(mealId, price, active) => this.dummy()}
                                        />
              }})
            }/>
            {
              this.props.store.data.order.multiplier > 1?
              <OrderField name="taxa de aumento" value={Math.round(((this.props.store.data.order.multiplier)*100)-100) + "%"}/>:
              this.props.store.data.order.multiplier < 1?
              <OrderField name="taxa de desconto" value={Math.round(100-((this.props.store.data.order.multiplier)*100)) + "%"}/>:
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
                                question={payment.question}
                                active={this.state.payments_collapsed.includes(payment.name).toString()}
                                addPaymentToCollapse={(payment, active) => this.addPaymentToCollapse(payment, active)}
                                addPayment={(value) => this.addPayment(value)}/>
            })
          }
          </div>
        </div>
        {
          this.state.payment_selected !== ""?
          <OrderBar totalPrice={this.props.store.data.order.total_price * this.props.store.data.order.multiplier}
                    text={"finalizar"}
                    continue={(data) => this.createOrder(this.props.store.data.order)} />:
          <Footer p={this.props.history} />
        }
      </div>
    );
  }
}