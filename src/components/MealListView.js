import React from 'react';

export default class MealListView extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.addMealToOrder(this.props.id, this.props.price, this.props.active);
        console.log("click1")
    }

    render() {
        return ( 
            <div className="meal-list" active={this.props.active.toString()} onClick={() => this.handleClick()}>
                <div className="meal-list__image" style={ { backgroundImage: `url(${ this.props.url})`}}>
                </div>
    
                <div className="meal-list__info">
                    <div className="meal-list__name">
                        { this.props.name }
                    </div>
                    <div className="meal-list__data">
                        { this.props.description }
                    </div>
                </div>
            
                <div className="meal-list__price">
                    { 'R$' + (this.props.price / 100) }
                </div>  
            </div>
        );
    }
}
