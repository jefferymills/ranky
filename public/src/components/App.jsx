var React = require('react');
var Router = require('react-router');
var { Route, RouteHandler, Link } = Router;

var APP = React.createClass({
  render: function() {
    return (
      <div>
        <Link to="login">Log in</Link>
        <RouteHandler />
      </div>
      );
  }
});

module.exports = APP;
