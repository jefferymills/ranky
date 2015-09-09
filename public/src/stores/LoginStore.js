import BaseStore from './BaseStore';
import AppDispatcher from '../dispatchers/AppDispatcher';
import AppConstants from '../constants/app-constants';

class LoginStore extends BaseStore {

  constructor() {
    super();
    this.dispatchToken = AppDispatcher.register(this._registerToActions.bind(this));
    this._user = null;
    this._jwt = null;
  }

  _registerToActions(payload) {
    var action = payload.action;
    switch(action.actionType) {
      case AppConstants.USER_SIGNED_UP:
        break;
      case AppConstants.USER_LOGGED_IN:
        this.emitChange();
        break;
    }

    return true;
  }
}

export default new LoginStore();
