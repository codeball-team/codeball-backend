import React, { Component, PropTypes } from 'react';
import { randomInteger } from 'utils';
import { BaseComponent } from 'components/base';

class BodyBackground extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired
  };

  componentWillMount = () => {
    const { images } = this.props;
    this.changeBackground(images);
  };

  changeBackground = (images, imageId = randomInteger(images.length)) => {
    const body = document.getElementsByTagName('body')[0];
    const { [imageId]: imageUrl } = images;
    body.style.backgroundImage = `url(${imageUrl})`;
  };

  render() {
    return (
      <span />
    );
  }
}

export default BaseComponent(BodyBackground);
