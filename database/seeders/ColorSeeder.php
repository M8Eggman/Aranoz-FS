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
            ['name' => 'blue', 'hex' => '#ecfdff'],
            ['name' => 'bright pink', 'hex' => '#ff3368'],
            ['name' => 'steel blue', 'hex' => '#5888b7'],
            ['name' => 'soft mint', 'hex' => '#ecf8f8'],
            ['name' => 'dark pink', 'hex' => '#e24175'],
            ['name' => 'muted blue', 'hex' => '#86a5c2'],
            ['name' => 'charcoal', 'hex' => '#1b1b1d'],
            ['name' => 'golden brown', 'hex' => '#ac9758'],
            ['name' => 'aqua gray', 'hex' => '#bcd9d4'],
            ['name' => 'mauve gray', 'hex' => '#bba9b5'],
            ['name' => 'soft gray', 'hex' => '#d2cfd6'],
            ['name' => 'sage', 'hex' => '#c3c3a1'],
            ['name' => 'pale pink', 'hex' => '#fdd4d4'],
            ['name' => 'sand beige', 'hex' => '#e9dcc4'],
            ['name' => 'mist blue', 'hex' => '#d8e4ec'],
            ['name' => 'soft lavender', 'hex' => '#d7c8e2'],
            ['name' => 'willow green', 'hex' => '#b9c8a3'],
            ['name' => 'pearl gray', 'hex' => '#e5e5e5'],
        ];

        foreach ($colors as $color) {
            Color::create($color);
        }
    }
}

