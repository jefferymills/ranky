import BaseStore from './BaseStore';
import AppDispatcher from '../dispatchers/AppDispatcher';
import AppConstants from '../constants/app-constants';

class WarStore extends BaseStore {

  constructor() {
    super();
    this.dispatchToken = AppDispatcher.register(this._registerToActions.bind(this));
    this._wars = null;
  }

  _setWars(wars) {
    this._wars = wars;
  }

  getWars() {
    return this._wars;
  }

  _registerToActions(payload) {
    var action = payload.action;
    switch(action.actionType) {
      case AppConstants.WARS_FETCHED:
        this._setWars(action.wars);
        this.emitChange();
        break;
    }

    return true;
  }
}

export default new WarStore();
