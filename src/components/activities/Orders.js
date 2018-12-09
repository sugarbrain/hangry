import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Header.js';
import Footer from '../Footer.js';
import Logo from '../../images/splash_logo.png';
import HeaderItem from '../HeaderItem.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import OrderListView from '../OrderListView.js';

export default class Orders extends Component {
    constructor(props) {
      super(props);
      this.state = {
        orders_collapsed: [],
        orders: []
      }

        this.addOrderToCollapse = this.addOrderToCollapse.bind(this);
    }

    componentDidMount() {
        this.props.store.sessions.map(session => {
        axios.get(`https://hangry-api.herokuapp.com/session/${session}/getOrders`)
            .then((data) => {
                let orders = this.state.orders;
                data.data.map(order => {
                    orders.push(order);
                    this.setState({
                        ...this.state,
                        orders
                    })
                })
            })
        })
        console.log(this.state);
    }

    addOrderToCollapse(orderId, alreadyCollapse) {
            if(!alreadyCollapse){
              let orders_collapsed = this.state.orders_collapsed;
              orders_collapsed.push(orderId)
              this.setState({
                ...this.state,
                orders_collapsed
              })
            }else {
              const index = this.state.orders_collapsed.indexOf(orderId);
              let orders_collapsed = this.state.orders_collapsed;
              orders_collapsed.splice(index,1);
              this.setState({
                ...this.state,
                orders_collapsed
              })
            }
            console.log(this.state);
    }


    render(){
        return(
        <div className="activity orders">
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
            <div className="activity__section ">
            <h1 className="padded">pedidos</h1>
            <div className="home__order-list-view padded-x">
            {
                this.state.orders.length == 0?
                <div><h3>Nenhum pedido encontrado!</h3></div>:<div></div>
            }
            {
              this.state.orders.map(order => {
                console.log(order);
                return <OrderListView key={order._id}
                                        id={order._id}
                                        from = {order.from_timestamp}
                                        to = {order.to_timestamp}
                                        total_price={order.total_price}
                                        multiplier={order.multiplier}
                                        status = {order.status}
                                        active={this.state.orders_collapsed.includes(order._id)}
                                        addOrderToCollapse={(orderId, active) => this.addOrderToCollapse(orderId, active)}
                                        />
              })
            }
            </div>
          </div>

            <Footer p={this.props.history} />
        </div>);
    }
}