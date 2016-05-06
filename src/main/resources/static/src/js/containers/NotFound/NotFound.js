import React, { Component } from 'react';
import './NotFound.scss';

export default class NotFound extends Component {
  render() {
    return (
      <div>
        <h1 className="not-found">
          Error 404 :(
        </h1>
        <p>
          {window.location.hash} not found!
        </p>
      </div>
    );
  }
}
