import React from 'react';
import Router from 'react-router';
import { Route, RouteHandler, Link, Navigation } from 'react-router';
import APP from './components/App';
import Signup from './components/Signup';
import Login from './components/Login';

import reqwest from 'reqwest';

const Users = React.createClass({
  mixins: [ Navigation ],
  getInitialState: function() {
    return {
      users: []
    };
  },
  componentDidMount: function() {
    var self = this;

    reqwest({
      url: 'api/user',
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }
    }).then(function(users) {
      self.setState({
        users: users
      })
    }).fail(function(err, msg) {
      self.transitionTo('/login');
    });
  },
  render: function() {
      const users = this.state.users.map(function(user) {
      return <tr key={user.email}><td>{user.name}</td><td>{user.email}</td></tr>
    });
    return (
      <table>
        {users}
      </table>
    )
  }
});



var routes = (
  <Route handler={APP}>
    <Route name="login" handler={Login} />
    <Route name="signup" handler={Signup} />
    <Route name="users" handler={Users} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler />, document.getElementById('main'));
});
