import AppConstants from '../constants/app-constants';
import AppDispatcher from '../dispatchers/AppDispatcher';
import reqwest from 'reqwest';

export const WarActions = {
  requestBattle(warId, userId) {
    reqwest({
      url: '/api/battle',
      method:'GET',
      data: {warId, userId},
      headers: {
        'X-CSRF-TOKEN': csrf_token,
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }
    }).then((battle) => {
      AppDispatcher.handleAction({
        actionType: AppConstants.BATTLE_FETCHED,
        battle: battle
      });
    }).fail(function(err, smg) {
      window.location = '/login';
      console.log(err);
    });;
  },

  declareBattleResults(params) {
    reqwest({
      url: '/api/battle',
      method: 'POST',
      data: params,
      headers: {
        'X-CSRF-TOKEN': csrf_token,
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }
    }).then(function(result) {
      AppDispatcher.handleAction({
        actionType: AppConstants.BATTLE_COMPLETED
      });
    }).fail(function(err, smg) {
      console.log(err);
      window.location = '/login';
    });
  },

  requestWars() {
    console.log('requestWars');
    reqwest({
      url: '/api/wars',
      method: 'GET',
      headers: {
        'X-CSRF-TOKEN': csrf_token,
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }
    }).then(function(wars) {
      console.log('then');
      AppDispatcher.handleAction({
        actionType: AppConstants.WARS_FETCHED,
        wars: wars
      });
    }).fail(function(err, smg) {
      console.log('fail');
      window.location = '/login';
    });
  },

  requestUserWarRankings(war_id, user_id) {
    reqwest({
      url: '/api/rankings/' + user_id,
      method: 'GET',
      data: {war_id, user_id},
      headers: {
        'X-CSRF-TOKEN': csrf_token,
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }
    }).then(function(results) {
      AppDispatcher.handleAction({
        actionType: AppConstants.USER_RANKING_FETCHED,
        ranking: results
      });
    });
  },

  requestPublicWarRankings(war_id) {
    reqwest({
      url: '/api/rankings/public/' + war_id,
      method: 'GET',
      headers: {
        'X-CSRF-TOKEN': csrf_token,
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }
    }).then(function(results) {
      console.log(results);
      AppDispatcher.handleAction({
        actionType: AppConstants.PUBLIC_RANKING_FETCHED,
        ranking: results
      });
    })
  }
};
