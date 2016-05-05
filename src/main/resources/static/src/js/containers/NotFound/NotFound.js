import React, { Component } from 'react';
import './NotFound.scss';

export default class NotFound extends Component {
  render() {
    return (
      <div>
        <h1 className="not-found">
          404 :(
        </h1>
        <p>
          {window.location.pathname} not found!
        </p>
      </div>
    );
  }
}
