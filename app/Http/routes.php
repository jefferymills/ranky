<?php

use App\User;
use App\Http\Controllers\Auth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Http\ResponseTrait;
use Illuminate\Support\Facades\Input;
use App\Http\Requests;
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::post('/login', function() {
  $credentials = Input::only('email', 'password');

try {
    if( ! $token = JWTAuth::attempt($credentials)) {
      return response()->json(['error' => 'invalid_credentials'], 401);
    }
} catch (JWTException $e) {
  return response()->json(['error' => 'could_not_create_token'], 500);
}

  return Response::json(compact('token'));
});

Route::post('facebook-login', 'UserController@facebookStore');
Route::post('facebook-user-update', 'UserController@facebookUpdate');

Route::post('signup', 'UserController@store');

Route::group(['middleware' => 'jwt.auth', 'prefix' => 'api'], function() {
  Route::resource('user', 'UserController');
  Route::resource('wars', 'WarController');
  Route::resource('battle', 'BattleController');
  Route::get('rankings/{user_id}', 'UserController@userRanking');
  Route::get('rankings/public/{war_id}', 'WarController@publicRanking');
});

Route::get('auth', ['middleware' => 'jwt.auth'], function() {
  return Response::json(['hit']);
});

Route::any('{all}', function () {
    return view('app');
})->where('all', '.*');
