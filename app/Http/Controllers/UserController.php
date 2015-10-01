<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User;
use Response;
use Input;
use Hash;
use JWTAuth;
use Facebook\FacebookRequest;
use App\War;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        //
        $users = User::all();

        return Response::json($users);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store()
    {
        //
        $credentials = Input::only('name', 'email', 'password', 'fb_id');
        $credentials['password'] = Hash::make($credentials['password']);

        try {
          $user = User::create($credentials);
        } catch (Exception $e) {
          return Response::json(['error' => 'User already exists.'], 'Illuminate\Http\Response::HTTP_CONFLICT');
        }

        $token = JWTAuth::fromUser($user);

        return Response::json(compact('token'));
    }

    public function facebookStore()
    {

      $currentUser = User::where('fb_id', Input::get('userID'))->first();

      if($currentUser !== null) {
          $user = $currentUser;
          $user->accessToken = Input::get('accessToken');
          $user->save();
      } else {
        try {
          $user = new User;
          $user->accessToken = Input::get('accessToken');
          $user->fb_id = Input::get('userID');
          $user->save();

        } catch (Exception $e) {
          return Response::json(['error' => 'User already exists.'], 'Illuminate\Http\Response::HTTP_CONFLICT');
        }
      }

      $token = JWTAuth::fromUser($user, ['name' => $user->name, 'id' => $user->id]);

      return Response::json(compact('token'));
    }

    public function facebookUpdate()
    {
      $data = Input::only('name', 'email', 'id');

      try {
        $user = User::where('fb_id', $data['id'])->first();
        $user->name = $data['name'];
        if(!empty($data['email'])) {
          $user->email = $data['email'];
        } else {
          $user->email = $data['name'] . '@facebook.com';
        }
        $user->save();
      } catch (Exception $e) {
        return Response::json(['error' => "User doesn't exist"], 'Illuminate\Http\Response::HTTP_CONFLICT');
      }

      $token = JWTAuth::fromUser($user, ['name' => $user->name, 'id' => $user->id]);

      return Response::json(compact('token'));
    }

    public function userRanking($user_id)
    {
      $data = Input::all();

      $userRanking = War::userRanking($data['war_id'], $user_id);

      return Response::json($userRanking);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        //
        $user = User::find($id);

        return Response::json($user);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function update($id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
