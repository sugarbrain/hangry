import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

export default class CheckoutCard extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.addCheckoutToOrder(this.props.from, this.props.to, this.props.multiplier, this.props.active);
        console.log("clickOrder")
    }

    render(){
        return (
            <div className="checkout-card" active={this.props.active.toString()} onClick={() => this.handleClick()}>
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
        );
    }
}
