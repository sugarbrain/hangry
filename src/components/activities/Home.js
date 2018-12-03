import React, { Component } from 'react';
import Header from '../Header.js';
import Footer from '../Footer.js';
import Logo from '../../images/splash_logo.png';
import HeaderItem from '../HeaderItem.js';
import RestaurantCard from '../RestaurantCard.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';

export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <Header>
          <div className="home__header">
            <HeaderItem>
              <FontAwesomeIcon icon={faBars} />
            </HeaderItem>
            <img className="home__header-logo" src={Logo} />
            <HeaderItem>
              <FontAwesomeIcon icon={faSearch} />
            </HeaderItem>
          </div>
        </Header>

        <div className="home__content">
          <h1 className="padded" style={ { color: "#fff" } }>em destaque</h1>
          <div className="home__restaurants">
            <RestaurantCard name="Âncora" description="Comida brasileira" distance="2km" money="$$" />
            <RestaurantCard name="Genki Sushi" description="Comida japonesa" distance="0.5km" money="$$$" />
            <RestaurantCard name="Seu Boteco" description="Bar e comida caseira" distance="0.5km" money="$" />
          </div>
        </div>

        <div className="home__content home__more-ordered">
          <h1 className="padded">mais pedidos</h1>
          <div className="home__restaurants">
            <RestaurantCard name="Âncora" description="Comida brasileira" distance="2km" money="$$" />
            <RestaurantCard name="Genki Sushi" description="Comida japonesa" distance="0.5km" money="$$$" />
            <RestaurantCard name="Seu Boteco" description="Bar e comida caseira" distance="0.5km" money="$" />
          </div>
        </div>

        <Footer p={this.props.history} />
      </div>
    );
  }
}