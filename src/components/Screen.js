import React, { Component } from 'react';

export default class Template extends Component {
  render() {
    return (
      <div className="screen">
        <div className={
            "screen__header" + 
            this.props.stickyFooter ? " sticky" : "" }
        >
        </div>

        <div className="screen__content">
        </div>

        <div className={
            "screen__footer" + 
            this.props.stickyFooter ? " sticky" : "" }
        >

        </div>

      </div>
    );
  }
}