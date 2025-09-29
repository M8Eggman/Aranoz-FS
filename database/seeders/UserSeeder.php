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
    // Liste des rôles
    $roles = [
      1 => 'User',
      2 => 'Community Manager',
      3 => 'Agent',
      4 => 'Webmaster',
      5 => 'Admin',
    ];

    foreach ($roles as $id => $roleName) {
      $slug = strtolower(str_replace(' ', '_', $roleName));

      User::factory()->create([
        'name' => $roleName,
        'email' => $slug . '@example.com',
        'image' => null,
        'role_id' => $id,
        'password' => Hash::make('password')
      ]);
    }
  }
}
