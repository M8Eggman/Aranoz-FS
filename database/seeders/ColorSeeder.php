<?php

namespace Database\Seeders;

use App\Models\Color;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $colors = [
            ['name' => 'bleu'],
            ['name' => 'rose vif'],
            ['name' => 'bleu acier'],
            ['name' => 'menthe douce'],
            ['name' => 'rose foncé'],
            ['name' => 'bleu atténué'],
            ['name' => 'charbon'],
            ['name' => 'brun doré'],
            ['name' => 'gris aqua'],
            ['name' => 'gris mauve'],
            ['name' => 'gris doux'],
            ['name' => 'sauge'],
        ];

        foreach ($colors as $c) {
            Color::create($c);
        }
    }
}
