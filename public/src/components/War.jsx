let React = require('react/addons');
let PureRenderMixin = React.addons.PureRenderMixin;
import UserStore from '../stores/UserStore';
import WarStore from '../stores/WarStore';
import BattleStore from '../stores/BattleStore';
import RankingStore from '../stores/RankingStore';
import { WarActions } from '../actions/war-actions';
import { Navigation } from 'react-router';
import Auth from '../mixins/Auth';
import WarList from './WarList';

let Ranking = React.createClass({
  displayName: 'Ranking',
  propTypes: {
    list: React.PropTypes.array
  },
  mixins: [PureRenderMixin],
  render: function() {
    let players = this.props.list;
    let rankings = players.map((player, i) => {
      return (<li key={player.name}>{player.name} - {player.wins} - {player.losses} - {player.winpercentage}</li>);
    });
    return (
      <div className="ranking">
        <ul>
          {rankings}
        </ul>
      </div>
    );
  }
});

let Player = React.createClass({
  displayName: 'Player',
  propTypes: {
    player: React.PropTypes.object,
    opponent: React.PropTypes.object
  },
  mixins: [PureRenderMixin],
  _handleClick: function() {
    let winner_id = this.props.player.id;
    let loser_id = this.props.opponent.id
    let war_id = this.props.player.war_id;
    let params = {winner_id, loser_id, war_id, user_id: UserStore.user.id};
    WarActions.declareBattleResults(params);
  },
  render: function() {
    return (<div><a onClick={this._handleClick}>{this.props.player.name}</a></div>);
  }
});

let War = React.createClass({
  displayName: 'War',
  propTypes: {},
  mixins: [PureRenderMixin, Auth, Navigation],
  getInitialState: function() {
    return {
      battle: [],
      publicRanking: [],
      userRanking: []
    }
  },
  componentDidMount: function() {
    BattleStore.addChangeListener(this._handleBattleChange);
    RankingStore.addChangeListener(this._handleRankingChange);
    let warId = this.props.params.id;
    let userId = UserStore.user.id;
    WarActions.requestBattle(warId, userId);
    WarActions.requestUserWarRankings(warId, userId);
    WarActions.requestPublicWarRankings(warId);
  },
  componentWillUnmount: function() {
      BattleStore.removeChangeListener(this._handleBattleChange);
      RankingStore.removeChangeListener(this._handleRankingChange);
  },
  _handleBattleChange: function() {
    let battle = BattleStore.getBattle();
    if(battle) {
      this.setState({battle});
    } else {
      let warId = this.props.params.id;
      let userId = UserStore.user.id;
      WarActions.requestBattle(warId, userId);
      WarActions.requestUserWarRankings(warId, userId);
      WarActions.requestPublicWarRankings(warId);
    }
  },
  _handleRankingChange: function() {
    let userRanking = RankingStore.getUserRanking();
    let publicRanking = RankingStore.getPublicRanking();
    this.setState({userRanking, publicRanking});
  },
  render: function() {
    let battle = this.state.battle;
    let battleLinks;
    if(battle.length) {
      battleLinks = (
        <div>
          <Player key='player1' player={battle[0]} opponent={battle[1]} />
          <Player key='player2' player={battle[1]} opponent={battle[0]} />
        </div>
      );
    }
    return (
      <div>
        {battleLinks}
        <br/><br/><br/>
        <Ranking list={this.state.userRanking} />
        <Ranking list={this.state.publicRanking} />
      </div>
    );
  }
});

module.exports = War;
