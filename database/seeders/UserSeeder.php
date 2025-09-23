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
        'password' => Hash::make('password'),
        'image' => 'alice.jpg',
        'role_id' => 1, // User
      ],
      [
        'name' => 'Bob',
        'email' => 'bob@example.com',
        'password' => Hash::make('password'),
        'image' => 'bob.jpg',
        'role_id' => 2, // Community Manager
      ],
      [
        'name' => 'Charlie',
        'email' => 'charlie@example.com',
        'password' => Hash::make('password'),
        'image' => 'charlie.jpg',
        'role_id' => 3, // Agent
      ],
      [
        'name' => 'Diane',
        'email' => 'diane@example.com',
        'password' => Hash::make('password'),
        'image' => 'diane.jpg',
        'role_id' => 4, // Webmaster
      ],
      [
        'name' => 'Eric',
        'email' => 'eric@example.com',
        'password' => Hash::make('password'),
        'image' => 'eric.jpg',
        'role_id' => 5, // Admin
      ],
    ];

    foreach ($users as $user) {
      User::create($user);
    }
  }
}
