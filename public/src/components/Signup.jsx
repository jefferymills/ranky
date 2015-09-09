var React = require('react/addons');
import { OnboardActions } from '../actions/onboard-actions';

const Signup = React.createClass({
  _handleSubmit(e) {
    e.preventDefault();
    const values = {
      name: React.findDOMNode(this.refs.name).value,
      email: React.findDOMNode(this.refs.email).value,
      password: React.findDOMNode(this.refs.password).value
    };

    OnboardActions.signUp(values);
  },
  render() {
    return (
      <form onSubmit={this._handleSubmit}>
        <div>
          <input type="text" ref="name" placeholder="username" required />
        </div>
        <div>
          <input type="email" ref="email" placeholder="email" required validate />
        </div>
        <div>
          <input type="password" ref="password" placeholder="password" required />
        </div>
        <div>
          <input type="password" ref="confirm_password" placeholder="confirm password" required />
        </div>
        <button>Signup</button>
      </form>
    );
  }
});

module.exports = Signup;
