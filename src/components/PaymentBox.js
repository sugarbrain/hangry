import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

export default class PaymentBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.addPaymentToCollapse = this.addPaymentToCollapse.bind(this);
    }

    addPaymentToCollapse() {
        this.props.addPaymentToCollapse(this.props.name, this.props.active);
    }

    render(){
        return(
            <div className="payment-box">
                <div className="payment-box__header" onClick={() => this.addPaymentToCollapse()}>
                    <div className="payment-box__details">
                        <div className="payment-box__name">
                            {this.props.name}
                        </div>
                        <div className="payment-box__info">
                            <div className="payment-box__data">
                                {this.props.description}
                            </div>
                        </div>
                    </div>
                    <div className="order-list__angle">
                            {
                                this.props.active?
                                <FontAwesomeIcon icon={faAngleUp} />:<FontAwesomeIcon icon={faAngleDown} />
                            }
                    </div>
                    <div className="payment-box__content" active={this.props.active}>
                            {
                                "Oi"
                            }
                    </div>
                </div>
            </div>
        );
    }

}