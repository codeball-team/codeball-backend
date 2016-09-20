import React, { Component } from 'react';

export default class Unauthorized extends Component {
  render() {
    return (
      <main>
        <h1 className="fg-danger">
          Unauthorized!
        </h1>

        <p>
          You do not have access to this page.
        </p>
      </main>
    );
  }
}
