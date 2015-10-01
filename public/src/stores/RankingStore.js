import BaseStore from './BaseStore';
import AppDispatcher from '../dispatchers/AppDispatcher';
import AppConstants from '../constants/app-constants';

let _userRanking = [];
let _publicRanking = [];

class RankingStore extends BaseStore {

  constructor() {
    super();
    this.dispatchToken = AppDispatcher.register(this._registerToActions.bind(this));
  }

  _setUserRanking(ranking) {
    _userRanking = ranking;
  }

  getUserRanking() {
    return _userRanking;
  }

  _setPublicRanking(ranking) {
    _publicRanking = ranking;
  }

  getPublicRanking() {
    return _publicRanking;
  }

  _registerToActions(payload) {
    var action = payload.action;
    switch(action.actionType) {
      case AppConstants.USER_RANKING_FETCHED:
        this._setUserRanking(action.ranking);
        this.emitChange();
        break;
      case AppConstants.PUBLIC_RANKING_FETCHED:
        this._setPublicRanking(action.ranking);
        this.emitChange();
        break;
    }

    return true;
  }
}

export default new RankingStore();
