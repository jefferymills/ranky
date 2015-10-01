import BaseStore from './BaseStore';
import AppDispatcher from '../dispatchers/AppDispatcher';
import AppConstants from '../constants/app-constants';

class BattleStore extends BaseStore {

  constructor() {
    super();
    this.dispatchToken = AppDispatcher.register(this._registerToActions.bind(this));
    this._battle = null;
  }

  _setBattle(battle) {
    this._battle = battle;
  }

  getBattle() {
    return this._battle;
  }

  _registerToActions(payload) {
    var action = payload.action;
    switch(action.actionType) {
      case AppConstants.BATTLE_FETCHED:
        this._setBattle(action.battle);
        this.emitChange();
        break;
      case AppConstants.BATTLE_COMPLETED:
        this._setBattle(null);
        this.emitChange();
        break;
    }

    return true;
  }
}

export default new BattleStore();
