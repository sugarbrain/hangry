import React from 'react';

const OrderField = props => {
    return (
        <div className="order-field">
            <div className="order-field__name">{ props.name }</div>
            <div className="order-field__value">{ props.value }</div>
        </div>
    );
};

export default OrderField;