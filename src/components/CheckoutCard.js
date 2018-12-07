import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const CheckoutCard = props => {
    return (
        <div className="checkout-card" onClick={() => this.props.handleClick(props.slot) }>
            <div className="checkout-card__hour">
                { props.slot.from }
            </div>
            <div className="text">
                às
            </div>
            <div className="checkout-card__hour">
                { props.slot.to }
            </div>
        </div>
    );
}

export default CheckoutCard;