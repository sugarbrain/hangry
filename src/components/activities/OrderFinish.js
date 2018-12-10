import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

export default class OrderFinish extends React.Component {

    componentDidMount() {
        console.log(this.props.history)
        setTimeout(() => {
            this.props.history.push('/home')
        }, 3000);
    }

    render() {
        return (
            <div className="order-finish">
                <div className="order-finish__icon">
                    <FontAwesomeIcon icon={faTrophy} />
                </div>
                <div className="order-finish__text">
                {
                    "Pedido finalizado com sucesso!"
                }
                <div className="order-finish__description">
                    Nós te avisaremos quando sua refeição estiver disponível para retirada.
                </div>
                </div>
            </div>
        );
    }
}