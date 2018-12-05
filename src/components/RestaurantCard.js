import React from 'react';

const RestaurantCard = props => {
    return (
        <div className="restaurant-card__outer">
            <div className="restaurant-card" style={ { backgroundImage: `url(${ props.url})`} }>
                <div className="restaurant-card__inner">
                    <div className="restaurant-card__name">
                        { props.name }
                    </div>
                    <div className="restaurant-card__details">
                        { props.category + " • " + props.distance }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RestaurantCard;
