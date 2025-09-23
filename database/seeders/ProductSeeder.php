<?php

namespace Database\Seeders;


use App\Models\Product;
use App\Models\ProductCategorie;
use App\Models\Color;
use App\Models\Specification;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = ProductCategorie::all();
        $colors = Color::all();

        $images = Storage::disk('public')->allFiles('products');

        // Crée 20 produits
        Product::factory(20)->make()->each(function ($product) use ($categories, $colors, $images) {
            $image = basename($images[array_rand($images)]);
            $product->image_main = $image;
            $product->image_rear = $image;
            $product->image_left_side = $image;
            $product->image_right_side = $image;
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
