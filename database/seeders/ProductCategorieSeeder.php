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
            ['name' => 'Chaises'],
            ['name' => 'Buffets'],
            ['name' => 'Vaisseliers'],
            ['name' => 'Étagères'],
            ['name' => 'Bibliothèques'],
            ['name' => 'Canapés'],
            ['name' => 'Fauteuils'],
            ['name' => 'Méridiennes'],
            ['name' => 'Bureaux'],
            ['name' => 'Lits'],
            ['name' => 'Armoires'],
        ];

        foreach ($categories as $c) {
            ProductCategorie::create($c);
        }

    }
}
