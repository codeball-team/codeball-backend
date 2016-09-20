import React, { Component } from 'react';

export default class NotFound extends Component {
  render() {
    return (
      <main>
        <h1 className="fg-danger">
          Error 404 :(
        </h1>

        <p>
          {window.location.hash} not found!
        </p>
      </main>
    );
  }
}
