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
            <IndexLink activeClassName="focus" to="/">
              <IconFootball className="icon" />
              <span className="label">
                Upcoming match
              </span>
            </IndexLink>
          </li>
          <li>
            <Link activeClassName="focus" to="/match-history">
              <IconCalendar className="icon" />
              <span className="label">
                Match history
              </span>
            </Link>
          </li>
          <li>
            <Link activeClassName="focus" to="/list-of-players" >
              <IconPeople className="icon" />
              <span className="label">
                List of players
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
