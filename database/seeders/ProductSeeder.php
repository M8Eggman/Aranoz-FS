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
        // Récupère toutes les images du dossier 'products/product'
        $productImages = Storage::disk('public')->files('products/product');
        $folders = ['banner', 'feature_small', 'feature_large', 'offer', 'product'];

        // Fonction pour générer un set d’images selon les dossiers
        function makeImageSet($baseImage, $folders)
        {
            $set = [];
            foreach ($folders as $folder) {
                $set[$folder] = "/storage/products/{$folder}/{$baseImage}";
            }
            return $set;
        }

        // Récupère les catégories et couleurs existantes
        $categories = ProductCategorie::all()->keyBy('name');
        $colors = Color::all()->keyBy('name');

        // Tableau des produits cohérents
        $productsData = [
            [
                'filename' => 'product_1.png',
                'name' => 'Modern Blue Sofa',
                'description' => "A contemporary blue sofa featuring a sleek metal frame and plush cushions. Perfect for adding a pop of color and comfort to any modern living space. Its minimalist design blends style and durability, making it ideal for both homes and offices.",
                'category' => $categories['sofas']->id ?? $categories->first()->id,
                'color' => $colors['blue']->id ?? $colors->first()->id,
                'specs' => [
                    'width' => 210,
                    'height' => 85,
                    'depth' => 90,
                    'weight' => 48,
                    'quality_checking' => true,
                    'freshness_duration' => null,
                    'packaging' => 'Plastic wrap',
                    'content' => 1,
                ],
                'price' => 549,
                'stock' => 6,
            ],
            [
                'filename' => 'product_2.png',
                'name' => 'Patchwork Scandinavian Chair',
                'description' => "A vibrant patchwork chair inspired by Scandinavian design. Features a mix of colorful fabrics and a sturdy light wood base. Perfect for adding a playful touch to your dining room or creative workspace.",
                'category' => $categories['chairs']->id ?? $categories->first()->id,
                'color' => $colors['multicolor']->id ?? $colors->first()->id,
                'specs' => [
                    'width' => 48,
                    'height' => 85,
                    'depth' => 55,
                    'weight' => 5,
                    'quality_checking' => true,
                    'freshness_duration' => null,
                    'packaging' => 'Box',
                    'content' => 1,
                ],
                'price' => 119,
                'stock' => 15,
            ],
            [
                'filename' => 'product_3.png',
                'name' => 'White Eames Armchair',
                'description' => "Iconic white armchair inspired by Eames design, featuring a molded seat and light wooden legs. Perfect for modern interiors, dining rooms, or creative spaces. Combines comfort, style, and durability.",
                'category' => $categories['armchairs']->id ?? $categories->first()->id,
                'color' => $colors['white']->id ?? $colors->first()->id,
                'specs' => [
                    'width' => 62,
                    'height' => 80,
                    'depth' => 60,
                    'weight' => 6,
                    'quality_checking' => true,
                    'freshness_duration' => null,
                    'packaging' => 'Box',
                    'content' => 1,
                ],
                'price' => 139,
                'stock' => 14,
            ],
            [
                'filename' => 'product_4.png',
                'name' => 'Red Design Chair',
                'description' => "A modern red chair with a sleek molded seat and light wooden legs. Adds a bold touch to any dining or office space. Durable and comfortable for everyday use.",
                'category' => $categories['chairs']->id ?? $categories->first()->id,
                'color' => $colors['red']->id ?? $colors->first()->id,
                'specs' => [
                    'width' => 47,
                    'height' => 83,
                    'depth' => 54,
                    'weight' => 5,
                    'quality_checking' => true,
                    'freshness_duration' => null,
                    'packaging' => 'Box',
                    'content' => 1,
                ],
                'price' => 109,
                'stock' => 13,
            ],
            [
                'filename' => 'product_5.png',
                'name' => 'White Design Chair',
                'description' => "Minimalist white chair with a molded seat and light wooden legs. Perfect for Scandinavian-inspired interiors, dining rooms, or offices.",
                'category' => $categories['chairs']->id ?? $categories->first()->id,
                'color' => $colors['white']->id ?? $colors->first()->id,
                'specs' => [
                    'width' => 47,
                    'height' => 83,
                    'depth' => 54,
                    'weight' => 5,
                    'quality_checking' => true,
                    'freshness_duration' => null,
                    'packaging' => 'Box',
                    'content' => 1,
                ],
                'price' => 109,
                'stock' => 13,
            ],
            [
                'filename' => 'product_6.png',
                'name' => 'Green Metal Chair',
                'description' => "Contemporary green chair with a molded seat and sturdy metal legs. Ideal for modern kitchens, dining rooms, or creative spaces.",
                'category' => $categories['chairs']->id ?? $categories->first()->id,
                'color' => $colors['green']->id ?? $colors->first()->id,
                'specs' => [
                    'width' => 47,
                    'height' => 83,
                    'depth' => 54,
                    'weight' => 5,
                    'quality_checking' => true,
                    'freshness_duration' => null,
                    'packaging' => 'Box',
                    'content' => 1,
                ],
                'price' => 109,
                'stock' => 13,
            ],
            [
                'filename' => 'product_7.png',
                'name' => 'Orange Design Chair',
                'description' => "Bright orange chair with molded seat and wooden legs. A bold accent for dining rooms or creative spaces, combining comfort and modern style.",
                'category' => $categories['chairs']->id ?? $categories->first()->id,
                'color' => $colors['orange']->id ?? $colors->first()->id,
                'specs' => [
                    'width' => 47,
                    'height' => 83,
                    'depth' => 54,
                    'weight' => 5,
                    'quality_checking' => true,
                    'freshness_duration' => null,
                    'packaging' => 'Box',
                    'content' => 1,
                ],
                'price' => 109,
                'stock' => 13,
            ],
            [
                'filename' => 'product_8.png',
                'name' => 'Blue Eames Armchair',
                'description' => "Classic blue armchair with molded seat and light wooden legs. Perfect for modern interiors, dining rooms, or creative spaces.",
                'category' => $categories['armchairs']->id ?? $categories->first()->id,
                'color' => $colors['blue']->id ?? $colors->first()->id,
                'specs' => [
                    'width' => 62,
                    'height' => 80,
                    'depth' => 60,
                    'weight' => 6,
                    'quality_checking' => true,
                    'freshness_duration' => null,
                    'packaging' => 'Box',
                    'content' => 1,
                ],
                'price' => 139,
                'stock' => 14,
            ],
            [
                'filename' => 'product_9.png',
                'name' => 'Curved Orange Lounge Chair',
                'description' => "Unique orange lounge chair with a curved, modern design and metal base. Adds a designer touch to any living room or lounge area.",
                'category' => $categories['chaise lounges']->id ?? $categories->first()->id,
                'color' => $colors['orange']->id ?? $colors->first()->id,
                'specs' => [
                    'width' => 80,
                    'height' => 90,
                    'depth' => 100,
                    'weight' => 18,
                    'quality_checking' => true,
                    'freshness_duration' => null,
                    'packaging' => 'Box',
                    'content' => 1,
                ],
                'price' => 249,
                'stock' => 7,
            ],
            [
                'filename' => 'product_10.png',
                'name' => 'Round Turquoise Ottoman',
                'description' => "Plush round ottoman in turquoise fabric with button tufting. Ideal as a footrest or extra seating in living rooms and bedrooms.",
                'category' => $categories['armchairs']->id ?? $categories->first()->id,
                'color' => $colors['turquoise']->id ?? $colors->first()->id,
                'specs' => [
                    'width' => 50,
                    'height' => 45,
                    'depth' => 50,
                    'weight' => 7,
                    'quality_checking' => true,
                    'freshness_duration' => null,
                    'packaging' => 'Box',
                    'content' => 1,
                ],
                'price' => 89,
                'stock' => 18,
            ],
            [
                'filename' => 'product_11.png',
                'name' => 'Yellow Retro Sofa',
                'description' => "Retro-inspired yellow sofa with buttoned cushions and wooden legs. Brightens up any living room with its cheerful color and comfortable seating.",
                'category' => $categories['sofas']->id ?? $categories->first()->id,
                'color' => $colors['yellow']->id ?? $colors->first()->id,
                'specs' => [
                    'width' => 170,
                    'height' => 85,
                    'depth' => 90,
                    'weight' => 40,
                    'quality_checking' => true,
                    'freshness_duration' => null,
                    'packaging' => 'Plastic wrap',
                    'content' => 1,
                ],
                'price' => 399,
                'stock' => 5,
            ],
            [
                'filename' => 'product_12.png',
                'name' => 'Wicker Lounge Chair',
                'description' => "Natural wicker lounge chair with a round shape and white cushion. Perfect for relaxing in sunrooms, patios, or cozy corners.",
                'category' => $categories['chaise lounges']->id ?? $categories->first()->id,
                'color' => $colors['brown']->id ?? $colors->first()->id,
                'specs' => [
                    'width' => 80,
                    'height' => 75,
                    'depth' => 80,
                    'weight' => 10,
                    'quality_checking' => true,
                    'freshness_duration' => null,
                    'packaging' => 'Box',
                    'content' => 1,
                ],
                'price' => 179,
                'stock' => 8,
            ],
            [
                'filename' => 'product_13.png',
                'name' => 'Orange Design Chair',
                'description' => "Bright orange chair with molded seat and wooden legs. A bold accent for dining rooms or creative spaces, combining comfort and modern style.",
                'category' => $categories['chairs']->id ?? $categories->first()->id,
                'color' => $colors['orange']->id ?? $colors->first()->id,
                'specs' => [
                    'width' => 47,
                    'height' => 83,
                    'depth' => 54,
                    'weight' => 5,
                    'quality_checking' => true,
                    'freshness_duration' => null,
                    'packaging' => 'Box',
                    'content' => 1,
                ],
                'price' => 109,
                'stock' => 13,
            ],
            [
                'filename' => 'product_14.png',
                'name' => 'Blue Eames Armchair',
                'description' => "Classic blue armchair with molded seat and light wooden legs. Perfect for modern interiors, dining rooms, or creative spaces.",
                'category' => $categories['armchairs']->id ?? $categories->first()->id,
                'color' => $colors['blue']->id ?? $colors->first()->id,
                'specs' => [
                    'width' => 62,
                    'height' => 80,
                    'depth' => 60,
                    'weight' => 6,
                    'quality_checking' => true,
                    'freshness_duration' => null,
                    'packaging' => 'Box',
                    'content' => 1,
                ],
                'price' => 139,
                'stock' => 14,
            ],
            [
                'filename' => 'product_15.png',
                'name' => 'Curved Orange Lounge Chair',
                'description' => "Unique orange lounge chair with a curved, modern design and metal base. Adds a designer touch to any living room or lounge area.",
                'category' => $categories['chaise lounges']->id ?? $categories->first()->id,
                'color' => $colors['orange']->id ?? $colors->first()->id,
                'specs' => [
                    'width' => 80,
                    'height' => 90,
                    'depth' => 100,
                    'weight' => 18,
                    'quality_checking' => true,
                    'freshness_duration' => null,
                    'packaging' => 'Box',
                    'content' => 1,
                ],
                'price' => 249,
                'stock' => 7,
            ],
        ];

        foreach ($productsData as $data) {
            $baseImage = $data['filename'];

            // 30% de chance d'avoir une promotion, sinon null
            rand(1, 100) <= 30 ?
                // Promotion par palier de 5 entre 5 et 50
                $promotion = 5 * rand(1, 50 / 5) :
                $promotion = null;

            $product = new Product();
            $product->name = $data['name'];
            $product->description = $data['description'];
            $product->images_main = makeImageSet($baseImage, $folders);
            $product->images_rear = makeImageSet($baseImage, $folders);
            $product->images_left_side = makeImageSet($baseImage, $folders);
            $product->images_right_side = makeImageSet($baseImage, $folders);
            $product->price = $data['price'];
            $product->stock = $data['stock'];
            $product->category_id = $data['category'];
            $product->color_id = $data['color'];
            $product->promotion = $promotion;
            $product->save();

            Specification::create([
                'product_id' => $product->id,
                'width' => $data['specs']['width'] ?? null,
                'height' => $data['specs']['height'] ?? null,
                'depth' => $data['specs']['depth'] ?? null,
                'weight' => $data['specs']['weight'] ?? null,
                'quality_checking' => $data['specs']['quality_checking'] ?? true,
                'freshness_duration' => $data['specs']['freshness_duration'] ?? null,
                'packaging' => $data['specs']['packaging'] ?? null,
                'content' => $data['specs']['content'] ?? null,
            ]);
        }
    }
}
