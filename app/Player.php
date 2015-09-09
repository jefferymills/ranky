<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Player extends Model
{
    public function war()
    {
      return $this->belongsTo('War');
    }

    static function getNewPlayers($userId, $warId)
    {
      $results = DB::select(DB::raw(
        "SELECT
          a.name AS name_a,
          b.name AS name_b,
          a.id AS id_a,
          b.id AS id_b
          FROM players a
          INNER JOIN players b ON a.id < b.id
          WHERE a.war_id = " . $warId . "
          AND b.war_id = " . $warId . "
          AND NOT EXISTS (
            SELECT * FROM battles c
            WHERE c.player_a = a.id
            AND c.player_b = b.id
            AND c.war_id = " . $userId .")
            ORDER BY a.id * rand()
            LIMIT 1"
      ));

      $players = [];

      if(isset($results[0])) {
        $players[0] = array(
          'id' => $results[0]->id_a,
          'name' => $results[0]->name_a
        );

        $players[1] = array(
          'id' => $results[0]->id_b,
          'name' => $results[0]->name_b
        );
      } else {
        $players['message'] = "Battles Completed";
        $players['complete'] = TRUE;
      }

      return $players;
    }
}
