import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';

import EventSearchPack from './eventsSearch/pack';

export default class Main extends React.Component {
  static asd() {
    return 'asd';
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={EventSearchPack} />
        </Switch>
      </Router>
    );
  }
}
