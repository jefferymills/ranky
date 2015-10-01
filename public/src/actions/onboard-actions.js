import AppConstants from '../constants/app-constants';
import AppDispatcher from '../dispatchers/AppDispatcher';
import reqwest from 'reqwest';

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

export const OnboardActions = {
  signUp(values) {
    reqwest({
      url: 'signup',
      method: 'post',
      data: values,
      headers: {
        'X-CSRF-TOKEN': csrf_token
      }
    }).then(function(resp) {
      localStorage.setItem('jwt', resp.token);

      AppDispatcher.handleAction({
        actionType: AppConstants.USER_SIGNED_UP,
        response: resp
      });
    });
  },

  loginUser(values) {
    reqwest({
      url: 'login',
      method: 'post',
      data: values,
      headers: {
        'X-CSRF-TOKEN': csrf_token
      }
    }).then(function(resp) {
      localStorage.setItem('jwt', resp.token);

      AppDispatcher.handleAction({
        actionType: AppConstants.USER_LOGGED_IN,
        response: resp
      });
    });
  },

  facebookLogin() {
    FB.login(function(response) {
      if(response.status === 'connected') {
        reqwest({
          url: 'facebook-login',
          method: 'post',
          data: response.authResponse,
          headers: {
            'X-CSRF-TOKEN': csrf_token
          }
        }).then(function(resp) {

          FB.api('/me?fields=email,name', function(response) {
            reqwest({
              url: 'facebook-user-update',
              method: 'post',
              data: response,
              headers: {
                'X-CSRF-TOKEN': csrf_token
              }
            }).then(function() {
              localStorage.setItem('jwt', resp.token);
              AppDispatcher.handleAction({
                actionType: AppConstants.USER_LOGGED_IN,
                response: resp
              });
            });
          });

        });
      } else if (response.status === 'not_authorized') {

      } else {

      }
    }, {scope: 'public_profile,email'});
  }
};
