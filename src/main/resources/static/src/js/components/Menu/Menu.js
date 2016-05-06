import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Icon from '../Icon/Icon';
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
              <Icon name="ball" className="menu-icon" pathClassName="menu-icon-path" />
              Upcoming match
            </IndexLink>
          </li>
          <li>
            <Link activeClassName="active" to="/match-history">
              <Icon name="calendar" className="menu-icon" pathClassName="menu-icon-path" />
              Match history
            </Link>
          </li>
          <li>
            <Link activeClassName="active" to="/list-of-players" >
              <Icon name="player" className="menu-icon" pathClassName="menu-icon-path" />
              List of players
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
