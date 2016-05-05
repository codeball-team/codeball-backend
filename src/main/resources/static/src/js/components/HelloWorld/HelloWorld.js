import React, { Component, PropTypes } from 'react';

export default class HelloWorld extends Component {
  static propTypes = {
    sayHello: PropTypes.func.isRequired
  };

  render() {
    const {
      sayHello,
      saidHello
    } = this.props;

    return (
      <div>
        {!saidHello && (
          <button onClick={sayHello}>Say Hello!</button>
        )}

        {saidHello && (
          <div>
            Hello!
          </div>
        )}
      </div>
    );
  }
}
