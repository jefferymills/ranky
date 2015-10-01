<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Battle extends Model
{
    public function war()
    {
      return $this->belongsTo('War');
    }

    public function user()
    {
      return $this->belongsTo('User');
    }

    public function newBattle($userId, $warId)
    {
      $results = DB::select(DB::raw("select
  									a.name as name_a,
  									b.name as name_b,
  									a.id as id_a,
  									b.id as id_b,
                    a.war_id as war_id,
                    b.war_id as war_id
  									from players a
  									inner join players b on a.id < b.id
  									where a.war_id = " . $warId . "
  									and b.war_id = " .$warId . "
  									and not exists (
  	    							select *
  	    							from battles c
  	    							where c.player_a = a.id
  	      							and c.player_b = b.id
  	      							and c.war_id = " .$warId . "
  	      							and user_id = " . $userId . ")
  								order by a.id * rand()
  								limit 1"
  		));

  		$players = array();

  		if(isset($results[0])) {
  			$players[0] = array('id' => $results[0]->id_a, 'name' => $results[0]->name_a, 'war_id' => $results[0]->war_id);
  			$players[1] = array('id' => $results[0]->id_b, 'name' => $results[0]->name_b, 'war_id' => $results[0]->war_id);
  		} else {
  			$players['message'] = "Battles Completed";
  			$players['complete'] = TRUE;
  		}

  		return $players;
    }
}
