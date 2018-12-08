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
        switch(this.props.multiplier) {
            case 0.95:
                return '#4caf50';
            case 1.1:
                return '#FF9800';
            case 1.15:
                return '#ff5500';
            default:
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
