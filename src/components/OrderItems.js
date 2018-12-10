import React from "react";

const OrderItems = props => {
    return (
        <div className="order-items">
            <div className="order-items__list">
                {
                    props.items.map(meal => {
                        return <div className="order-items__item" key={meal._id}>
                            <div className="name">
                                <img src={ meal.image_url} />
                                { meal.name }
                            </div>
                            <div className="price">
                                { 'R$' + (meal.price / 100).toFixed(2) }
                            </div>
                        </div>
                    })
                }
            </div>

            <div className="order-items__sumup">
                <div className="discount">
                    <div>{ props.discount > 1 ? 'aumento' : 'desconto' }</div>
                    <div className="rate">{ Math.round(((props.discount)*100)-100) + "%" }</div>
                </div>

                <div className="total">
                    <div>TOTAL</div>
                    <div className="price">{  'R$' + (props.totalPrice * props.discount / 100).toFixed(2) || 'R$0,00' }</div>
                </div>
            </div>
            
        </div>
        
    );
}

export default OrderItems;