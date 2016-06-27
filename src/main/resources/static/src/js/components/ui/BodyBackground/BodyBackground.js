import React, { Component, PropTypes } from 'react';
import { randomInteger } from 'utils';

export default class BodyBackground extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired
  };

  componentWillMount = () => {
    const { images } = this.props;
    this.changeBackground(images);
  };

  changeBackground = (images, imageId = randomInteger(images.length)) => {
    const body = document.getElementsByTagName('body')[0];
    const imageUrl = images[imageId];
    body.style.backgroundImage = `url(${imageUrl})`;
  };

  render() {
    return (
      <span />
    );
  }
}
