import BaseStore from './BaseStore';
import AppDispatcher from '../dispatchers/AppDispatcher';
import AppConstants from '../constants/app-constants';

function urlBase64Decode(str) {
   var output = str.replace('-', '+').replace('_', '/');
   switch (output.length % 4) {
       case 0:
           break;
       case 2:
           output += '==';
           break;
       case 3:
           output += '=';
           break;
       default:
           throw 'Illegal base64url string!';
   }
   return window.atob(output);
}

class UserStore extends BaseStore {

  constructor() {
    super();
    this.dispatchToken = AppDispatcher.register(this._registerToActions.bind(this));
    this._user = null;
    this._jwt = localStorage.getItem('jwt');
    this._setUser();
  }

  _setUser() {
    if(this._jwt) {
      let encoded = this._jwt.split('.')[1];
      let user = JSON.parse(urlBase64Decode(encoded));
      this._user = user;
    }
  }

  get user() {
    return this._user;
  }

  _registerToActions(payload) {
    var action = payload.action;
    switch(action.actionType) {
      case AppConstants.USER_LOGGED_IN:
        this._jwt = localStorage.getItem('jwt');
        this._setUser(action.response.token);
        this.emitChange();
        break;
    }

    return true;
  }
}

export default new UserStore();
