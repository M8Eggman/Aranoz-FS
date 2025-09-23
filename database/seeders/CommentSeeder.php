<?php

namespace Database\Seeders;

use App\Models\Blog;
use App\Models\Comment;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = Product::all();
        $blogs = Blog::all();

        // Crée des commentaires pour tous les produits
        foreach ($products as $product) {
            Comment::factory()
                // Crée le nombre de commentaire entre 1 et 5
                ->count(fake()->numberBetween(1, 5))
                ->forProduct($product->id)
                ->create();
        }

        // Crée des commentaires pour tous les blogs
        foreach ($blogs as $blog) {
            Comment::factory()
                ->count(fake()->numberBetween(1, 5))
                ->forBlog($blog->id)
                ->create();
        }
    }
}
