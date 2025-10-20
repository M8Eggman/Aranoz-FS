<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::insert([
            // 1 : Client (acheter, commenter blog, suivre commandes)
            ['name' => 'user'],
            // 2 : Community Manager (CRUD blog, créer tags)
            ['name' => 'community_manager'],
            // 3 : Agent (gérer commandes, changer statut, envoyer mails dashboard)
            ['name' => 'agent'],
            // 4 : Webmaster (CRUD produit, pin sur home, gérer stock, modifier contact)
            ['name' => 'webmaster'],
            // 5 : Admin (tous droits)
            ['name' => 'admin'],
        ]);
    }
}
