import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import IconFootball from 'react-icons/lib/io/ios-football';
import IconCalendar from 'react-icons/lib/io/ios-calendar-outline';
import IconPeople from 'react-icons/lib/io/ios-people';

import './Menu.scss';

export default class Menu extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  render() {
    const {
      className
    } = this.props;

    return (
      <nav className={className}>
        <div className="menu-logo">
          Codeball
        </div>

        <ul>
          <li>
            <IndexLink activeClassName="active" to="/">
              <IconFootball className="menu-icon" />
              <span>
                Upcoming match
              </span>
            </IndexLink>
          </li>
          <li>
            <Link activeClassName="active" to="/match-history">
              <IconCalendar className="menu-icon" />
              <span>
                Match history
              </span>
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="/list-of-players" >
              <IconPeople className="menu-icon" />
              <span>
                List of players
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
