import AppConstants from '../constants/app-constants';
import AppDispatcher from '../dispatchers/AppDispatcher';
import reqwest from 'reqwest';

export const GlobalActions = {

  initApp() {
    let token = localStorage.getItem('jwt');
    let encoded = token.split('.')[1];
    let user = JSON.parse(urlBase64Decode(encoded));
    AppDispatcher.handleAction({
      actionType: AppConstants.APP_INIT,
      user: user
    });
  },

  requestWars() {
    reqwest({
      url: 'api/wars',
      method: 'GET',
      headers: {
        'X-CSRF-TOKEN': csrf_token,
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }
    }).then(function(wars) {
      AppDispatcher.handleAction({
        actionType: AppConstants.WARS_FETCHED,
        wars: wars
      });
    });
  }
};
