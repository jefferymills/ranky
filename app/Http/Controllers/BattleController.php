<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Battle;
use App\Player;
use Response;
use Input;

class BattleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
      $data = Input::all();

      $battle = new Battle;
      $newBattle = $battle->newBattle($data['userId'], $data['warId']);

      return Response::json($newBattle);
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
      $oldBattle = Battle::where('user_id', '=', Input::get('user_id'))->where('player_a', '=', min(Input::get('winner_id'), Input::get('loser_id')))->where('player_b', '=', max(Input::get('winner_id'), Input::get('loser_id')))->exists();
      if(!$oldBattle) {
        $battle = new Battle;
        $battle->user_id = Input::get('user_id');
        $battle->winner_id = Input::get('winner_id');
        $battle->loser_id = Input::get('loser_id');
        $battle->war_id = Input::get('war_id');
        $battle->player_a = min($battle->winner_id, $battle->loser_id);
        $battle->player_b = max($battle->winner_id, $battle->loser_id);

        $battle->save();

        $result = 0;
        $result = $this->declareTransitiveWins($battle->winner_id, $battle->loser_id, $battle->war_id);

        $player = Player::find($battle->winner_id);
        $player->increment('wins');

        $player = Player::find($battle->loser_id);
        $player->increment('losses');

        $battleCount = Battle::where('war_id', '=', Input::get('war_id'))->where('user_id', '=', $battle->user_id)->count();

        return Response::json(array(
          'error' => false,
          'data' => 'Success',
          'battleCount' => $battleCount),
          200
        );
      }
    }

    public function declareTransitiveWins($winner_id, $loser_id, $war_id)
  	{
  		$this->winnerRecursive($winner_id, $loser_id, $war_id);
  		$this->loserRecursive($winner_id, $loser_id, $war_id);
  	}

  	public function winnerRecursive($winner_id, $loser_id, $war_id)
  	{
  		// Get all battles where winner has lost
  		$winner_losses = Battle::where('loser_id', '=', $winner_id)->where('user_id', '=', Input::get('user_id'))->get();
  		$winner_losses_array = $winner_losses->toArray();

  		if(count($winner_losses_array)) {
  			foreach ($winner_losses_array as $key => $losses) {

  				// Check if this battle has already been recorded, if so skip it
  				$oldBattle = Battle::where('user_id', '=', Input::get('user_id'))->where('player_a', '=', min($loser_id, $losses['winner_id']))->where('player_b', '=', max($loser_id, $losses['winner_id']))->exists();
  				if($oldBattle) continue;

  				$battle = new Battle;
  				$battle->user_id = Input::get('user_id');
  				$battle->winner_id = $losses['winner_id'];
  				$battle->loser_id = $loser_id;
  				$battle->war_id = $war_id;
  				$battle->player_a = min($losses['winner_id'], $loser_id);
  				$battle->player_b = max($losses['winner_id'], $loser_id);

  				$battle->save();


  				$player = Player::find($losses['winner_id']);
  				$player->increment('wins');

  				$player = Player::find($loser_id);
  				$player->increment('losses');

  				$this->winnerRecursive($losses['winner_id'], $loser_id, $war_id);
  			}
  		}
  	}

  	public function loserRecursive($winner_id, $loser_id, $war_id)
  	{
  		// Get all battles where loser has won
  		$loser_wins = Battle::where('winner_id', '=', $loser_id)->where('user_id', '=', Input::get('user_id'))->get();
  		$loser_wins_array = $loser_wins->toArray();

  		if(count($loser_wins_array)) {
  			foreach ($loser_wins_array as $key => $wins) {

  				// Check if this battle has already been recorded, if so skip it
  				$oldBattle = Battle::where('user_id', '=', Input::get('user_id'))->where('player_a', '=', min($winner_id, $wins['loser_id']))->where('player_b', '=', max($winner_id, $wins['loser_id']))->exists();
  				if($oldBattle) continue;

  				$battle = new Battle;
  				$battle->user_id = Input::get('user_id');
  				$battle->winner_id = $winner_id;
  				$battle->loser_id = $wins['loser_id'];
  				$battle->war_id = $war_id;
  				$battle->player_a = min($wins['loser_id'], $winner_id);
  				$battle->player_b = max($wins['loser_id'], $winner_id);

  				$battle->save();


  				$player = Player::find($winner_id);
  				$player->increment('wins');

  				$player = Player::find($wins['loser_id']);
  				$player->increment('losses');

  				$this->loserRecursive($winner_id, $wins['loser_id'], $war_id);
  			}
  		}
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
