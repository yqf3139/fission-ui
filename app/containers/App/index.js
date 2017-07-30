/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { browserHistory } from 'react-router';
import withProgressBar from 'components/ProgressBar';
import LocaleToggle from 'containers/LocaleToggle';
import { FormattedMessage } from 'react-intl';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import commonMessages from 'messages';

export function App(props) {
  const onLink = (e) => {
    browserHistory.push(e);
  };

  const onExternalLink = (e) => {
    window.open(`http://${location.hostname}:${e}`);
  };

  window.fissionPort2Namespace = {
    31319: 'fission',
    31419: 'fission-dev',
  };

  window.fissionNamespace2Port = ({
    fission: 31319,
    'fission-dev': 31419,
  });

  window.fissionNamespace = window.fissionPort2Namespace[window.location.port];

  return (
    <div className="container">
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Fission UI</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={'/'} onSelect={onLink}>
              <i className="glyphicon glyphicon-flash" />
              <span><FormattedMessage {...commonMessages.function} /></span>
            </NavItem>
            <NavItem eventKey={'/environments'} onSelect={onLink}>
              <i className="glyphicon glyphicon-tasks" />
              <span><FormattedMessage {...commonMessages.environment} /></span>
            </NavItem>
            <NavItem eventKey={'/benchmarks'} onSelect={onLink}>
              <i className="glyphicon glyphicon-stats" />
              <span><FormattedMessage {...commonMessages.benchmark} /></span>
            </NavItem>
            <NavItem eventKey={'/service-catalog'} onSelect={onLink}>
              <i className="glyphicon glyphicon-th" />
              <span><FormattedMessage {...commonMessages.serviceCatalog} /></span>
            </NavItem>
            <NavItem eventKey={window.fissionNamespace === 'fission' ? '31318' : '31418'} onSelect={onExternalLink}>
              <i className="glyphicon glyphicon-retweet" />
              <span><FormattedMessage {...commonMessages.compose} /></span>
            </NavItem>
            <NavItem eventKey={'31326'} onSelect={onExternalLink}>
              <i className="glyphicon glyphicon-fire" />
              <span><FormattedMessage {...commonMessages.metric} /></span>
            </NavItem>
            <NavItem eventKey={'31327'} onSelect={onExternalLink}>
              <i className="glyphicon glyphicon-zoom-in" />
              <span><FormattedMessage {...commonMessages.tracing} /></span>
            </NavItem>
            <NavItem eventKey={'/billing'} onSelect={onLink}>
              <i className="glyphicon glyphicon-btc" />
              <span><FormattedMessage {...commonMessages.billing} /></span>
            </NavItem>
            <NavItem>
              <i className="glyphicon glyphicon-home" />
              <select
                value={window.fissionNamespace2Port[window.fissionNamespace]}
                onChange={(e) => onExternalLink(e.target.value)}
              >
                {
                  Object.keys(window.fissionNamespace2Port).sort().map((k) => (
                    <option key={k} value={window.fissionNamespace2Port[k]}>{k}</option>
                  ))
                }
              </select>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="row">
        {React.Children.toArray(props.children)}
      </div>
      <h5>Language</h5>
      <LocaleToggle />

    </div>
  );
}
App.propTypes = {
  children: React.PropTypes.node,
};

export default withProgressBar(App);
