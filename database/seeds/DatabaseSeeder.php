<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\User;
use App\War;
use App\Player;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call(UserTableSeeder::class);
        $this->call(WarTableSeeder::class);
        $this->call(PlayerTableSeeder::class);

        Model::reguard();
    }
}

/**
 * UserTableSeeder
 */
class UserTableSeeder extends Seeder
{
  public function run()
  {
    DB::table('users')->delete();

    User::create(array(
      'name' => 'cougarbreath',
      'email' => 'breathmills@gmail.com',
      'password' => Hash::make('asdf')
    ));
  }
}

/**
 * WarTableSeeder
 */
class WarTableSeeder extends Seeder
{
  public function run()
  {
    DB::table('wars')->delete();

    War::create(array(
      'title' => 'Best Superhero Movie',
      'public' => TRUE,
      'user_id' => 1
    ));
  }
}

/**
 * PlayerTableSeeder
 */
class PlayerTableSeeder extends Seeder
{
  public function run()
  {
    DB::table('players')->delete();

    $playersArray = [
      [
        'name' => 'Iron Man',
        'war_id' => 1
      ],
      [
        'name' => 'Gaurdians Of The Galaxy',
        'war_id' => 1
      ],
      [
        'name' => 'Batman Begins',
        'war_id' => 1
      ],
      [
        'name' => 'X-Men',
        'war_id' => 1
      ],
      [
        'name' => 'Captain America: The First Avenger',
        'war_id' => 1
      ],
      [
        'name' => 'Superman II',
        'war_id' => 1
      ],
      [
        'name' => 'Captain America: The Winter Soldier',
        'war_id' => 1
      ],
      [
        'name' => 'X2: X-Men United',
        'war_id' => 1
      ],
      [
        'name' => 'X-Men: First Class',
        'war_id' => 1
      ],
      [
        'name' => 'Superman: The Movie',
        'war_id' => 1
      ],
      [
        'name' => 'Batman',
        'war_id' => 1
      ],
      [
        'name' => 'The Avengers',
        'war_id' => 1
      ],
      [
        'name' => 'The Incredibles',
        'war_id' => 1
      ],
      [
        'name' => 'The Dark Knight',
        'war_id' => 1
      ]
    ];

    foreach ($playersArray as $key => $player) {
      Player::create($player);
    }
  }
}
