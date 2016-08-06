import React, { Component } from 'react';
import { ConditionalRender } from 'components/base';
import { Icon, Link } from 'components/ui';
import './Navigation.scss';

class Navigation extends Component {
  render() {
    return (
      <nav className="navigation">
        <div className="menu-logo">
          Codeball
        </div>

        <ul>
          <li>
            <Link activeClassName="focus" to="/upcoming-game">
              <Icon name="alarm" />
              <span className="label">
                Upcoming game
              </span>
            </Link>
          </li>

          <li>
            <Link activeClassName="focus" to="/last-game">
              <Icon name="podium" />
              <span className="label">
                Last game
              </span>
            </Link>
          </li>

          <li>
            <Link activeClassName="focus" to="/games">
              <Icon name="calendar" />
              <span className="label">
                Games
              </span>
            </Link>
          </li>

          <li>
            <Link activeClassName="focus" to="/players" >
              <Icon name="people" />
              <span className="label">
                Players
              </span>
            </Link>
          </li>

          <li>
            <Link activeClassName="focus" to="/pitches" >
              <Icon name="location" />
              <span className="label">
                Pitches
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default ConditionalRender(Navigation);
