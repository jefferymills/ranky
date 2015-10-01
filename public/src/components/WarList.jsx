let React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
import { GlobalActions } from '../actions/global-actions';
import { Navigation, Link } from 'react-router';
import WarStore from '../stores/WarStore';

let WarList = React.createClass({
  displayName: 'WarList',
  propTypes: {},
  mixins: [PureRenderMixin, Navigation],
  getInitialState: function() {
    return {
      wars: []
    }
  },
  componentDidMount: function() {
    GlobalActions.requestWars();
    WarStore.addChangeListener(this._handleWarsChange);
  },
  componentWillUnmount: function() {
    WarStore.removeChangeListener(this._handleWarsChange);
  },
  _handleWarsChange: function() {
    let wars = WarStore.getWars();
    if(wars) {
      this.setState({
          wars: wars
      });
    }
  },
  render: function() {
    let wars = this.state.wars.map((war, i) => {
      return <li key={war.id}><Link to={`/war/${war.id}`}>{war.title}</Link></li>
    });

    return (
      <div className="battle-list">
        <h2>Start Your Next War</h2>
        <ul>
          {wars}
        </ul>
      </div>
    );
  }
});

module.exports = WarList;
