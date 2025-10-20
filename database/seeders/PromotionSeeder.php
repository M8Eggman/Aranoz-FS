<?php

namespace Database\Seeders;

use App\Models\Promotion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PromotionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $promos = [
            ['name' => 'WELCOME10', 'percentage' => 10],
            ['name' => 'SAVE20', 'percentage' => 20],
            ['name' => 'SUMMER15', 'percentage' => 15],
            ['name' => 'NEWUSER25', 'percentage' => 25],
        ];

        foreach ($promos as $promo) {
            Promotion::create($promo);
        }
    }
}
