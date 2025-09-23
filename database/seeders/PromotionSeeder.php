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
            ['name' => 'Promo Rentrée', 'percentage' => 10],
            ['name' => 'Black Friday', 'percentage' => 20],
            ['name' => 'Noël', 'percentage' => 15],
            ['name' => 'Anniversaire', 'percentage' => 25],
        ];

        foreach ($promos as $promo) {
            Promotion::create($promo);
        }
    }
}
