import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const RestaurantListView = props => {
    return ( 
        <div className="rest-list">
            <div className="rest-list__image" style={ { backgroundImage: `url(${ props.url})`}}>
            </div>

            <div className="rest-list__info">
                <div className="rest-list__name">
                    { props.name }
                </div>
                <div className="rest-list__data">
                    { props.category + " • " + props.distance }
                </div>
            </div>
        
            <div className="rest-list__angle">
                <FontAwesomeIcon icon={faAngleRight} />
            </div>  
        </div>
    );
}

export default RestaurantListView;
