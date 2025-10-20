<?php

namespace Database\Seeders;

use App\Models\BillingDetail;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BillingDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        foreach ($users as $user) {
            BillingDetail::factory()->create([
                'user_id' => $user->id,
            ]);
        }
    }
}
