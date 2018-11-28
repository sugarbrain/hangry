import React, { Component } from 'react';
import Header from '../Header.js';
import Footer from '../Footer.js';
import Logo from '../../images/splash_logo.png';

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <Header>
          <div className="home__header">
            <img className="home__header-logo" src={Logo} />
          </div>
        </Header>

        <div class="home__content">
          <h1>Principais ofertas</h1>
        </div>

        <Footer p={this.props.history} />
      </div>
    );
  }
}