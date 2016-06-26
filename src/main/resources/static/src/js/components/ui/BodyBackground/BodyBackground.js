import React, { Component } from 'react';
import { randomInteger } from 'utils';

const NUMBER_OF_IMAGES = 4;

export default class BodyBackground extends Component {
  componentWillMount = () => {
    this.changeBackground();
  };

  changeBackground = (imageId = randomInteger(NUMBER_OF_IMAGES)) => {
    const body = document.getElementsByTagName('body')[0];
    const imageUrl = `/images/bg/bg-${imageId}.jpg`;
    body.style.backgroundImage = `url(${imageUrl})`;
  };

  render() {
    return (
      <span />
    );
  }
}
