import React, { Component } from 'react';
import { Icon, RouterLink } from 'components/ui';
import './Navigation.scss';

export default class Navigation extends Component {
  render() {
    return (
      <nav className="navigation">
        <div className="menu-logo">
          Codeball
        </div>

        <ul>
          <li>
            <RouterLink activeClassName="focus" to="/upcoming-game">
              <Icon name="alarm" />
              <span className="label">
                Upcoming game
              </span>
            </RouterLink>
          </li>

          <li>
            <RouterLink activeClassName="focus" to="/last-game">
              <Icon name="podium" />
              <span className="label">
                Last game
              </span>
            </RouterLink>
          </li>

          <li>
            <RouterLink activeClassName="focus" to="/games">
              <Icon name="calendar" />
              <span className="label">
                Games
              </span>
            </RouterLink>
          </li>

          <li>
            <RouterLink activeClassName="focus" to="/players" >
              <Icon name="people" />
              <span className="label">
                Players
              </span>
            </RouterLink>
          </li>

          <li>
            <RouterLink activeClassName="focus" to="/pitches" >
              <Icon name="location" />
              <span className="label">
                Pitches
              </span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    );
  }
}
