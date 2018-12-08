import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

export default class CheckoutCard extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.borderColor = this.color.bind(this);
    }

    handleClick() {
        this.props.addCheckoutToOrder(this.props.from, this.props.to, this.props.multiplier, this.props.active);
        console.log("clickOrder")
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
            <div className="checkout-card__outer">
                <div className="checkout-card" active={this.props.active.toString()} 
                                               onClick={() => this.handleClick()}
                                               style={{
                                                    borderBottomColor: this.color(),
                                                    borderBottomWidth: 3
                                               }}
                                               >

                    <div className="checkout-card__hour">
                        {this.props.from }
                    </div>
                    <div className="text">
                        às
                    </div>
                    <div className="checkout-card__hour">
                        {this.props.to}
                    </div>
                </div>
            </div>
        );
    }
}
