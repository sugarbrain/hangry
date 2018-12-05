import React from 'react';
import { Link } from 'react-router-dom';

const MealListView = props => {
    return ( 
        <div className="meal-list">
            <div className="meal-list__image" style={ { backgroundImage: `url(${ props.url})`}}>
            </div>

            <div className="meal-list__info">
                <div className="meal-list__name">
                    { props.name }
                </div>
                <div className="meal-list__data">
                    { props.description }
                </div>
            </div>
        
            <div className="meal-list__price">
                { props.price }
            </div>  
        </div>
    );
}

export default MealListView;
