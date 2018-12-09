import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const OrderBar = props => {
    return (
        <div className="order-bar">
            <div className="order-bar__total">
                <div className="title">total</div>
                {
                    props.percentageRatio < 1?
                    <div className="percentage-ratio">{(100-(props.percentageRatio * 100).toFixed(0)) + '% DE DESCONTO'}</div>
                    : 
                    props.percentageRatio > 1?
                    <div className="percentage-ratio">{((props.percentageRatio * 100).toFixed(0) - 100) + '% DE AUMENTO'}</div>
                    :
                    <div></div>
                }
                <div className="total-price">{ 'R$' + (props.totalPrice / 100).toFixed(2) || 'R$0,00' }</div>
            </div>

            <div className="order-bar__button">
                <button onClick={() => props.continue()}>{props.text}<FontAwesomeIcon icon={faAngleRight} /></button>
            </div>
        </div>
    );
}

export default OrderBar;