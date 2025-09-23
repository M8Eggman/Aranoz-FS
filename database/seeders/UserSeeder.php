<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $users = [
      [
        'name' => 'Alice',
        'email' => 'alice@example.com',
        'image' => 'user/alice.jpg',
        'role_id' => 1, // User
      ],
      [
        'name' => 'Bob',
        'email' => 'bob@example.com',
        'image' => 'user/bob.jpg',
        'role_id' => 2, // Community Manager
      ],
      [
        'name' => 'Charlie',
        'email' => 'charlie@example.com',
        'image' => 'user/charlie.jpg',
        'role_id' => 3, // Agent
      ],
      [
        'name' => 'Diane',
        'email' => 'diane@example.com',
        'image' => 'user/diane.jpg',
        'role_id' => 4, // Webmaster
      ],
      [
        'name' => 'Eric',
        'email' => 'eric@example.com',
        'image' => 'user/eric.jpg',
        'role_id' => 5, // Admin
      ],
    ];

    foreach ($users as $u) {
      User::factory()->create($u);
    }
  }
}
