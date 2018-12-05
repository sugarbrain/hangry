import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantCard = props => {
    const linkURL = `/restaurant/${props.id}`;
    return (
        <Link to={linkURL}>
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
        </Link>
    );
}

export default RestaurantCard;
