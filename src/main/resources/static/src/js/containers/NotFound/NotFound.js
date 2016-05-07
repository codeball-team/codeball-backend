import React, { Component } from 'react';
import './NotFound.scss';

export default class NotFound extends Component {
  render() {
    return (
      <section className="not-found">
        <h1>
          Error 404 :(
        </h1>
        <p>
          {window.location.hash} not found!
        </p>
      </section>
    );
  }
}
