<?php

namespace Database\Seeders;

use App\Models\ProductCategorie;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductCategorieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'chairs'],
            ['name' => 'sideboards'],
            ['name' => 'china cabinets'],
            ['name' => 'shelves'],
            ['name' => 'bookcases'],
            ['name' => 'sofas'],
            ['name' => 'armchairs'],
            ['name' => 'chaise lounges'],
            ['name' => 'desks'],
            ['name' => 'beds'],
            ['name' => 'wardrobes'],
        ];

        foreach ($categories as $c) {
            ProductCategorie::create($c);
        }

    }
}
