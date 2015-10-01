var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var Router = require('react-router');
var { GlobalActions } = require('../actions/global-actions');
var { Route, RouteHandler, Link } = Router;
import UserStore from '../stores/UserStore';

var APP = React.createClass({
  render: function() {
    return (
      <div>
        <RouteHandler />
      </div>
      );
  }
});

module.exports = APP;
