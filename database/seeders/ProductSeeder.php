<?php

namespace Database\Seeders;


use App\Models\Product;
use App\Models\ProductCategorie;
use App\Models\Color;
use App\Models\Specification;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = ProductCategorie::all();
        $colors = Color::all();

        // Crée 20 produits
        Product::factory(20)->make()->each(function ($product) use ($categories, $colors) {
            $product->category_id = $categories->random()->id;
            $product->color_id = $colors->random()->id;
            $product->save();

            // Crée une spécification liée à ce produit
            Specification::factory()->create([
                'product_id' => $product->id,
            ]);
        });
    }
}
