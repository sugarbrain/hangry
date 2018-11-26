import React from 'react';
import Logo from '../../images/splash_logo.png';

export default class Splash extends React.Component {

    componentDidMount() {
        setTimeout(() => {
            this.props.history.push('/home')
        }, 1500);
    }

    render() {
        return (
            <div className="splash">
                <img src={Logo}></img>
            </div>
        );
    }
}