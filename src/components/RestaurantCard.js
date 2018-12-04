import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';

export default class Home extends Component {
  render() {
    return (
    <div className="restaurant-card__outer">
        <div className="restaurant-card" style={ { backgroundImage: `url(${ this.props.url})`}}>
            <div className="restaurant-card__inner">
                <div className="restaurant-card__name">{this.props.name}</div>
                <div className="restaurant-card__details">
                    { this.props.category + " • " + this.props.distance }
                </div>
            </div>
      </div>
    </div>
    );
  }
}