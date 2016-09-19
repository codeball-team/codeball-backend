import React, { Component } from 'react';
import { ContainerComponent } from 'components/base';
import './Changelog.scss';

class Changelog extends Component {
  render() {
    return (
      <section>
        {release2()}
        <hr />
        {release1()}
      </section>
    );
  }
}

function release2() {
  return (
    <div>
      <h2>Relase 2 (2016/10/04)</h2>
      <h3>Features</h3>
      <ul>
        <li>Auto-refreshing data every 10 seconds</li>
        <li>Microsoft Edge & Microsoft Internet Explorer support</li>
        <li>Changelog page</li>
      </ul>

      <h3>Bugfixes</h3>
      <ul>
        <li>Backend</li>
        <ul>
          <li>TODO</li>
        </ul>

        <li>Frontend</li>
        <ul>
          <li>Removing Team Lineup sorting</li>
          <li>Fixing invisible Team Lineup component on iOS</li>
          <li>Minor UI improvements</li>
        </ul>
      </ul>

      <h3>Technical improvements</h3>
      <ul>
        <li>Backend</li>
        <ul>
          <li>TODO</li>
        </ul>

        <li>Frontend</li>
        <ul>
          <li>Severe refactoring</li>
          <li>Improving performance</li>
          <ul>
            <li>Avoiding redundant AJAX calls</li>
            <li>Computing API response hashes to detect and avoid redundant virtual DOM re-renders</li>
            <li>Introducing reselect library</li>
          </ul>
          <li>Updating frontend libraries</li>
        </ul>
      </ul>
    </div>
  );
}

function release1() {
  return (
    <div>
      <h2>Relase 1 (2016/08/23)</h2>
      <h3>Features</h3>
      <ul>
        <li>Pitches</li>
        <ul>
          <li>List of pitches page</li>
          <li>Pitch page</li>
          <li>Add pitch page</li>
        </ul>
        <li>Players</li>
        <ul>
          <li>List of players page</li>
          <li>Player page</li>
          <li>Add player page</li>
        </ul>
        <li>Games</li>
        <ul>
          <li>List of upcoming & previous games page</li>
          <li>Previous game page</li>
          <ul>
            <li>Edit game score</li>
          </ul>
          <li>Upcoming game page</li>
          <ul>
            <li>Enrollment</li>
            <li>Enroll another player</li>
            <li>Close enrollment</li>
            <li>Draw teams</li>
            <li>End game</li>
          </ul>
          <li>Add game page</li>
        </ul>
      </ul>
    </div>
  );
}

export default ContainerComponent(Changelog);

