import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

export default class Home extends Component {
  render() {
    return (
        <div className="rest-list">
            <div className="rest-list__image" style={ { backgroundImage: `url(${ this.props.url})`}}>
            </div>
            <div className="rest-list__info">
                <div className="rest-list__name">
                    { this.props.name }
                </div>
                <div className="rest-list__data">
                    { this.props.category + " • " + this.props.distance }
                </div>
            </div>
        
            <div className="rest-list__angle">
                <FontAwesomeIcon icon={faAngleRight} />
            </div>  
        </div>
    );
  }
}