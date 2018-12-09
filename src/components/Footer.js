import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingCart, faFileAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default class Footer extends Component {

  render() {
    return (
        <div className="footer">
            <FooterItem to="/home" icon={faHome} title="Home" path={this.props.p} />
            <FooterItem to="/orders" icon={faFileAlt} title="Pedidos" path={this.props.p} />
            <FooterItem to="/profile" icon={faUser} title="Eu" path={this.props.p} />
        </div>     
    );
  }
}

const FooterItem = props => {
  const isActive = props.path.location.pathname === props.to
  return (
    <Link className={"footer__item" + (isActive ? " active" : "")} to={props.to}>
        <FontAwesomeIcon icon={props.icon} />
        <span>{props.title}</span>
    </Link>
  );
}