let React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
import UserStore from '../stores/UserStore';
import { Navigation } from 'react-router';
import Auth from '../mixins/Auth';
import WarList from './WarList';

let Home = React.createClass({
  displayName: 'Home',
  propTypes: {},
  mixins: [PureRenderMixin, Auth, Navigation],
  getInitialState: function() {
    return {
      userName: ''
    }
  },
  componentDidMount: function() {
    if(UserStore.user) {
      let userName = UserStore.user.name;
      this.setState({
          userName: userName
      });
    }
  },
  render: function() {

    return (
      <div>
        <WarList />
      </div>
    );
  }
});

module.exports = Home;
