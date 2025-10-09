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

        // Récupère toutes les images originales
        $images = Storage::disk('public')->allFiles('products');

        // Fonction pour générer un set d’images selon les dossiers
        function makeImageSet($baseImage, $folders)
        {
            $set = [];
            foreach ($folders as $folder) {
                $set[$folder] = "/storage/products/{$folder}/{$baseImage}";
            }
            return $set; // retourne un tableau, pas un JSON
        }

        Product::factory(20)->make()->each(function ($product) use ($categories, $colors, $images) {

            // Liste des dossiers de tailles / variantes
            $folders = ['banner', 'feature_small', 'feature_large', 'offer', 'product'];

            // Image de base aléatoire
            $baseImage = basename($images[array_rand($images)]);

            // Remplissage des images
            $product->images_main = makeImageSet($baseImage, $folders);
            $product->images_rear = makeImageSet($baseImage, $folders);
            $product->images_left_side = makeImageSet($baseImage, $folders);
            $product->images_right_side = makeImageSet($baseImage, $folders);

            // FK aléatoires
            $product->category_id = $categories->random()->id;
            $product->color_id = $colors->random()->id;

            $product->save();

            // Crée une spécification liée
            Specification::factory()->create([
                'product_id' => $product->id,
            ]);
        });
    }
}
