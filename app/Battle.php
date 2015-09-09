<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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
}
