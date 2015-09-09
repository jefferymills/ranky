<?php

namespace App;

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
}
