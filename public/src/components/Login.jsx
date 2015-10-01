var React = require('react/addons');
import { OnboardActions } from '../actions/onboard-actions';
import LoginStore from '../stores/LoginStore';
import UserStore from '../stores/UserStore';
import { Navigation } from 'react-router';

const Login = React.createClass({
  mixins: [Navigation],
  componentDidMount: function() {
    LoginStore.addChangeListener(this._handleLogin);
  },
  componentWillUnmount: function() {
    LoginStore.removeChangeListener(this._handleLogin);
  },
  _handleLogin: function() {
    this.transitionTo('/');
  },
  _handleFacebookLogin: function() {
    OnboardActions.facebookLogin();
  },
  _handleSubmit(e) {
    e.preventDefault();
    const values = {
      email: React.findDOMNode(this.refs.email).value,
      password: React.findDOMNode(this.refs.password).value
    };

    OnboardActions.loginUser(values);
  },
  render() {
    return (
      <div>
        <form onSubmit={this._handleSubmit}>
          <div>
            <input type="email" ref="email" placeholder="email" required validate />
          </div>
          <div>
            <input type="password" ref="password" placeholder="password" required />
          </div>
          <button>Login</button>
        </form>
        <button onClick={this._handleFacebookLogin}>Login with Facebook</button>
      </div>
    );
  }
});

module.exports = Login;
