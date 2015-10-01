<?php

namespace App;
use DB;

use Illuminate\Database\Eloquent\Model;

class War extends Model
{
    public function players()
    {
      return $this->hasMany('Player');
    }

    public function battles()
    {
      return $this->hasMany('Battle');
    }

    public static function publicRanking($war_id)
    {
      $results = DB::select(DB::raw("SELECT name, wins, losses, case when wins=0 then 0 else ((wins * 1.00)/((wins * 1.00) + (losses * 1.00)))*100 end as win_pct FROM players ORDER BY win_pct DESC;"));

        return $results;
    }

    public static function userRanking($war_id, $user_id)
    {
      $results = DB::select(DB::raw("select p.name as name,
          x.wins,
          x.losses,
          case when x.wins = 0 then 0
               else x.wins / x.total_games
               end as winpercentage
      from    (   select  player_id,
                      sum(case when outcome = 'W' then 1 else 0 end) as wins,
                      sum(case when outcome = 'L' then 1 else 0 end) as losses,
                      count(*) as total_games
              from    (
                          select  winner_id as player_id,
                                  'W' as outcome
                          from battles
                          where user_id = " . $user_id . "
                          union all
                          select  loser_id,
                                  'L'
                          from    battles
                          where user_id = " . $user_id . "
                      ) x
              group by player_id
          ) x
      join players p
       on x.player_id = p.id
       order by winpercentage DESC"
      ));

       return $results;
    }
}
