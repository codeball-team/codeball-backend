import React, { Component } from 'react';

export default class Unauthorized extends Component {
  render() {
    return (
      <section>
        <h1 className="fg-danger">
          Unauthorized!
        </h1>

        <p>
          You do not have access to this page.
        </p>
      </section>
    );
  }
}
