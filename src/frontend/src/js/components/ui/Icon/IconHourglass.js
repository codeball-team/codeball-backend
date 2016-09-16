/* eslint-disable */

import React, { Component } from 'react';
import IconBase from 'react-icon-base';
import { PureRenderComponent } from 'components/base';

class IconHourglass extends Component {
  render() {
    return (
      <IconBase viewBox="0 0 40 40" {...this.props}>
        <g>
          <line stroke="currentColor" strokeWidth="1.5" x1="7" y1="3" x2="33" y2="3" />
          <line stroke="currentColor" strokeWidth="1.5" x1="7" y1="37" x2="33" y2="37" />
          <line stroke="currentColor" strokeWidth="1.5"x1="7.656503" y1="3.344133" x2="32.343495" y2="36.655864" />
          <line stroke="currentColor" strokeWidth="1.5"x1="7.656504" y1="36.65586" x2="32.343496" y2="3.344134" />
          <rect stroke="currentColor" fill="currentColor" strokeWidth="1.5" x="12.781376" y="31.531026" width="14.374745" height="4.74985" />
          <rect stroke="currentColor" fill="currentColor" strokeWidth="1.5" x="16.468808" y="14.093871" width="7.062383" height="0.187491" />
          <path stroke="currentColor" d="m12.78125,30.937411c0,0 -3.993816,5.343839 -3.937565,5.343839c0.056251,0 4.106318,0.168753 4.106318,0.168753" strokeWidth="1.5" fill="currentColor" />
          <path stroke="currentColor" d="m28.21875,32.203906c0,0 0,4.264844 0,4.264844c0,0 3.3125,0 3.3125,0c0,0 -3.3125,-4.264844 -3.3125,-4.264844z" strokeWidth="1.5" fill="currentColor" />
          <path stroke="currentColor" d="m17.031195,15.46875c0.055001,0 2.750028,3.25 2.750028,3.25c0,0 2.750028,-3.106618 2.750028,-3.106618c0,0 -5.555056,-0.143382 -5.500055,-0.143382z" strokeWidth="1.5" fill="currentColor" />
        </g>
      </IconBase>
    );
  }
}

export default PureRenderComponent(IconHourglass);
