import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Header.js';
import Footer from '../Footer.js';
import Logo from '../../images/splash_logo.png';
import HeaderItem from '../HeaderItem.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';

export default class Profile extends Component {
    constructor(props) {
      super(props);
      this.state = {}
    }

    render(){
        return(
        <div className="activity profile">
            <Header>
                <div className="activity__header">
                <HeaderItem>
                    <FontAwesomeIcon icon={faBars} />
                </HeaderItem>
                <img className="activity__header-logo" src={Logo} />
                <HeaderItem>
                    <FontAwesomeIcon icon={faSearch} />
                </HeaderItem>
                </div>
            </Header>

            <Footer p={this.props.history} />
        </div>);
    }
}