import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import MealListView from './MealListView.js';

export default class OrderListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            meals: []
        }

        this.addOrderToCollapse = this.addOrderToCollapse.bind(this);
        this.dummy = this.dummy();
    }

    componentDidMount() {
        axios.get(`https://hangry-api.herokuapp.com/order/${this.props.id}/getAllMealsFromOrder`)
        .then(data => {
            console.log(data);
            this.setState(prevState => ({
                meals: data.data
            }));
        }).catch(err => {
            console.log(err);
        });
  }

    addOrderToCollapse() {
        this.props.addOrderToCollapse(this.props.id, this.props.active);
    }

    dummy(){

    }

    orderIcon() {
        switch(this.props.status) {
            case 'Pedido':
                return <FontAwesomeIcon icon={faCreditCard} />;
            case 'Em preparo':
                return <FontAwesomeIcon icon={faSpinner} />;
            case 'Cancelado':
                return <FontAwesomeIcon icon={faBan} />;
            case 'Pronto':
                return <FontAwesomeIcon icon={faCheckCircle} />;
            case 'Entregue':
                return <FontAwesomeIcon icon={faShoppingBag} />;
            default:
                return <FontAwesomeIcon icon={faQuestion} />;
        }
    }
    
    color() {
        if (this.props.multiplier >= 1.15) {
            return '#ff5500';
        }
        else if (this.props.multiplier >= 1.1){
            return '#FF9800';
        }
        else if (this.props.multiplier >= 0.95){
            return '#4caf50';            
        } else{
            return '#7faf4c';
        }
    }

    render(){
        return (
            <div className="order-list" style={{
                borderBottomColor: this.color(),
                borderBottomWidth: 3
                }}>
                <div className="order-list__header" onClick={() => this.addOrderToCollapse()}>
                    <div className="order-list__image">
                        {this.orderIcon()}
                    </div>
                    <div className="order-list__details">
                        <div className="order-list__name">
                                { (this.props.id).substr(a.length-5) }
                        </div>
                        {
                                this.props.multiplier < 1?
                                <div className="order-list__percentage-ratio">{(100-(this.props.multiplier * 100).toFixed(0)) + '% DE DESCONTO'}</div>
                                : 
                                this.props.multiplier > 1?
                                <div className="order-list__percentage-ratio">{((this.props.multiplier * 100).toFixed(0) - 100) + '% DE AUMENTO'}</div>
                                :
                                <div></div>
                        }
                        <div className="order-list__info">
                            <div className="order-list__price">
                                {"R$" + ((this.props.total_price/100)*this.props.multiplier).toFixed(2)}
                            </div>
                            <div className="order-list__data">
                                {"- " + this.props.from + "h às " + this.props.to + "h"}
                            </div>
                        </div>
                    </div>
                    <div className="order-list__angle">
                    {
                        this.props.active?
                        <FontAwesomeIcon icon={faAngleUp} />:<FontAwesomeIcon icon={faAngleDown} />
                    }
                        
                    </div>  
                </div>
                <div className="order-list__content" active={this.props.active.toString()}>
                    {
                        this.state.meals.map(meal => {
                            return <MealListView key={meal._id}
                                                id={meal._id}
                                                name={meal.name} 
                                                description={meal.description} 
                                                price={meal.price} 
                                                url={meal.image_url}
                                                active={false}
                                                addMealToOrder={(mealId, price, active) => this.dummy()}
                                                />
                        })
                    }
                </div>
                </div>
        );

    }
}
