import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const OrderBar = props => {
    return (
        <div className="order-bar">
            <div className="order-bar__total">
                <div className="title">total</div>
                <div className="total-price">{ 'R$' + (props.totalPrice / 100) || 'R$1.024,00' }</div>
            </div>

            <div className="order-bar__button">
                <button>continuar <FontAwesomeIcon icon={faAngleRight} /></button>
            </div>
        </div>
    );
}

export default OrderBar;